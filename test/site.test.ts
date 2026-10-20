import { expect, it } from "vitest"
import { bestGroup, liveGroups, liveVideos } from "../src/live"
import { buildSite, type SiteFile } from "../src/site"

const site = buildSite("https://example.github.io/fireplace")
const read = (path: string) => JSON.parse(site.find(file => file.path === path)?.body ?? "null")
const pathsOf = (files: SiteFile[]) => files.map(({ path }) => path)

it("declares, at the root, the row of the videos that open at once first, and a row for the best, which is the only group on by default", () => {
  const manifest = read("manifest.json")

  expect(manifest).toMatchObject({
    id: "community.fireplace",
    name: "🔥 Fireplace",
    resources: ["catalog", "meta", "stream"],
    types: ["movie"],
    idPrefixes: ["fp-"],
    behaviorHints: { configurable: true },
    logo: "https://example.github.io/fireplace/logo.png",
    stremioAddonsConfig: { issuer: "https://stremio-addons.net" },
  })
  expect(manifest.catalogs).toEqual([
    { type: "movie", id: "live", name: "🔥 Fireplace" },
    { type: "movie", id: "best", name: "Fireplace · Best" },
  ])
})

it("has the row of the videos that open at once first in every folder", () => {
  const manifests = site.filter(file => file.path.endsWith("manifest.json"))

  expect(manifests).toHaveLength(2 ** (liveGroups.length + 1))
  for (const { body } of manifests) expect(JSON.parse(body).catalogs[0]).toEqual({ type: "movie", id: "live", name: "🔥 Fireplace" })
})

it("picks the best by hand, from the videos of the groups, with a few from each", () => {
  const best = read("catalog/movie/best.json").metas.map(({ id }: { id: string }) => id)

  expect(best).toEqual(bestGroup.videos.map(({ id }) => `fp-${id}`))
  for (const group of liveGroups) expect(group.videos.filter(video => bestGroup.videos.includes(video)).length).toBeGreaterThanOrEqual(2)
})

it("lists the videos that open at once with the fireplace first, and each group's videos in its own row", () => {
  const live = read("catalog/movie/live.json").metas
  const space = read("groups=best,music,nature,animals,space/catalog/movie/space.json").metas

  expect(live.map(({ name }: { name: string }) => name)).toEqual(["Fireplace", "Lofi hip hop radio", "Rain and thunder", "Synthwave radio"])
  expect(live[0]).toMatchObject({ id: "fp-Mkv6368NCC8", type: "movie", poster: "https://i.ytimg.com/vi/Mkv6368NCC8/hqdefault.jpg", posterShape: "landscape" })
  expect(space.map(({ name }: { name: string }) => name)).toEqual(["Earth from the ISS", "Earth views from the ISS", "Starship at Starbase"])
})

it("has a folder for each choice of groups, with the plain one for only the best", () => {
  const folders = new Set(
    pathsOf(site)
      .filter(path => path.endsWith("manifest.json"))
      .map(path => path.slice(0, -"manifest.json".length)),
  )

  expect(folders.size).toBe(2 ** (liveGroups.length + 1))
  expect(folders).toContain("")
  expect(folders).not.toContain("groups=best/")
  // The addresses of those who installed it before the best, with their groups, still have their files
  expect(folders).toContain("groups=music,space/")
  expect(folders).toContain("groups=music,nature,animals,space/")
  expect(folders).toContain("groups=/")
})

it("has in the folder of a choice only the rows of the groups chosen, and the videos of those", () => {
  const manifest = read("groups=music,space/manifest.json")

  expect(manifest.catalogs.map(({ id }: { id: string }) => id)).toEqual(["live", "music", "space"])
  expect(read("groups=music,space/catalog/movie/music.json").metas).toHaveLength(3)
  expect(read("groups=music,space/stream/movie/fp-OYCHs8_Fgjk.json").streams).toHaveLength(1)
  expect(pathsOf(site)).toContain("groups=music,space/meta/movie/fp-7zmZ2JzuzxA.json")
  expect(pathsOf(site)).not.toContain("groups=music,space/meta/movie/fp-UQHWkaGATis.json")
})

it("keeps the videos that open at once when no group is chosen", () => {
  const manifest = read("groups=/manifest.json")

  expect(manifest.catalogs.map(({ id }: { id: string }) => id)).toEqual(["live"])
  expect(read("groups=/catalog/movie/live.json").metas).toHaveLength(liveVideos.length)
})

it("opens a video, whether it opens at once or is in a group", () => {
  expect(read("meta/movie/fp-rFZHOHl-L8A.json").meta).toMatchObject({ name: "Lofi hip hop radio", type: "movie" })
  expect(read("meta/movie/fp-7zmZ2JzuzxA.json").meta).toMatchObject({
    name: "Earth from the ISS",
    background: "https://i.ytimg.com/vi/7zmZ2JzuzxA/hqdefault.jpg",
  })
})

it("plays a video with YouTube's own player", () => {
  expect(read("stream/movie/fp-Mkv6368NCC8.json")).toEqual({ streams: [{ ytId: "Mkv6368NCC8", name: "Live" }] })
})

it("has a meta and a stream for each video, and no video twice", () => {
  const ids = [...liveVideos, ...liveGroups.flatMap(({ videos }) => videos)].map(({ id }) => id)

  expect(new Set(ids).size).toBe(ids.length)
  for (const id of ids) {
    expect(pathsOf(site)).toContain(`groups=best,music,nature,animals,space/meta/movie/fp-${id}.json`)
    expect(pathsOf(site)).toContain(`groups=best,music,nature,animals,space/stream/movie/fp-${id}.json`)
  }
})

it("sends the Configure button of a choice to the page that chooses the groups, with those chosen", () => {
  const page = site.find(file => file.path === "groups=music,space/configure/index.html")?.body

  expect(page).toContain('url=../../?groups=music,space"')
  expect(site.find(file => file.path === "configure/index.html")?.body).toContain('url=../?groups=best"')
})

it("has no file with a name that some systems won't have", () => {
  const unsafe = pathsOf(site).filter(path => /[:*?"<>|]/.test(path))

  expect(unsafe).toEqual([])
})
