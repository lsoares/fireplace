import { once } from "node:events"
import { writeFileSync } from "node:fs"
import { createServer } from "node:http"
import { chromium } from "playwright"
import { allVideoIds } from "./live"

// Which of the videos YouTube's own player will not play inside another page, which is what Stremio does with them, written to `blocked.json` for the build to leave out. It plays
// them in a real browser, as that is the only test that is true: the page of a video says it can be embedded when it cannot. It runs every day, as a video that let it can stop.
const ids = allVideoIds()
const notAllowed = [100, 101, 150]

const page = `<!doctype html><body><script src="https://www.youtube.com/iframe_api"></script><script>
window.results = {}
function onYouTubeIframeAPIReady() {
  for (const id of ${JSON.stringify(ids)}) {
    const holder = document.body.appendChild(document.createElement("div"))
    new YT.Player(holder, { videoId: id, width: 160, height: 90, events: { onReady: () => (window.results[id] ??= "ready"), onError: event => (window.results[id] = event.data) } })
  }
}
</script>`

const server = createServer((_, response) => response.setHeader("Content-Type", "text/html").end(page)).listen(0)
await once(server, "listening")
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL })
try {
  const tab = await browser.newPage()
  await tab.goto(`http://localhost:${(server.address() as { port: number }).port}/`)
  await tab
    .waitForFunction(count => Object.keys((window as unknown as { results: object }).results).length >= count, ids.length, { timeout: 60_000 })
    .catch(() => {})
  const results: Record<string, string | number> = await tab.evaluate(() => (window as unknown as { results: Record<string, string | number> }).results)
  const blocked = ids.filter(id => notAllowed.includes(Number(results[id])))
  // If most of them fail, it is the test that is wrong (YouTube asking this browser to sign in, say) and not the videos: then none are left out, as the list must not go empty
  const trusted = Object.values(results).includes("ready") && blocked.length <= ids.length / 2
  writeFileSync("blocked.json", `${JSON.stringify({ blocked: trusted ? blocked : [] }, null, 2)}\n`)
  console.log(
    trusted
      ? `${blocked.length} of ${ids.length} videos do not let embed: ${blocked.join(" ") || "none"}`
      : `The test is not to be trusted (${blocked.length} of ${ids.length} failed), so no video is left out`,
  )
} finally {
  await browser.close()
  server.close()
}
