import { expect, it } from "vitest"
import { liveGroups, liveVideos } from "../src/live"
import { buildSite, type SiteFile } from "../src/site"

const site = buildSite("https://example.github.io/fireplace")
const read = (path: string) => JSON.parse(site.find(file => file.path === path)?.body ?? "null")
const pathsOf = (files: SiteFile[]) => files.map(({ path }) => path)

it("declares, at the root, a row for the videos that open at once and a row for each group", () => {
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
    { type: "movie", id: "music", name: "Fireplace · Music" },
    { type: "movie", id: "nature", name: "Fireplace · Nature" },
    { type: "movie", id: "animals", name: "Fireplace · Animals" },
    { type: "movie", id: "space", name: "Fireplace · Space" },
  ])
})

it("lists the videos that open at once with the fireplace first, and each group's videos in its own row", () => {
  const live = read("catalog/movie/live.json").metas
  const space = read("catalog/movie/space.json").metas

  expect(live.map(({ name }: { name: string }) => name)).toEqual(["Fireplace", "Lofi hip hop radio", "Rain and thunder", "Synthwave radio"])
  expect(live[0]).toMatchObject({ id: "fp-Mkv6368NCC8", type: "movie", poster: "https://i.ytimg.com/vi/Mkv6368NCC8/hqdefault.jpg", posterShape: "landscape" })
  expect(space.map(({ name }: { name: string }) => name)).toEqual(["Earth from the ISS", "Earth views from the ISS", "Starship at Starbase"])
})

it("has a folder for each choice of groups, with the plain one for all of them", () => {
  const folders = new Set(
    pathsOf(site)
      .filter(path => path.endsWith("manifest.json"))
      .map(path => path.slice(0, -"manifest.json".length)),
  )

  expect(folders.size).toBe(2 ** liveGroups.length)
  expect(folders).toContain("")
  expect(folders).toContain("groups=music,space/")
  expect(folders).toContain("groups=/")
})

it("has in the folder of a choice only the rows of the groups chosen, and the videos of those", () => {
  const manifest = read("groups=music,space/manifest.json")

  expect(manifest.catalogs.map(({ id }: { id: string }) => id)).toEqual(["live", "music", "space"])
  expect(read("groups=music,space/catalog/movie/music.json").metas).toHaveLength(3)
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
    expect(pathsOf(site)).toContain(`meta/movie/fp-${id}.json`)
    expect(pathsOf(site)).toContain(`stream/movie/fp-${id}.json`)
  }
})

it("sends the Configure button of a choice to the page that chooses the groups, with those chosen", () => {
  const page = site.find(file => file.path === "groups=music,space/configure/index.html")?.body

  expect(page).toContain('url=../../?groups=music,space"')
  expect(site.find(file => file.path === "configure/index.html")?.body).toContain('url=../?groups=music,nature,animals,space"')
})

it("has no file with a name that some systems won't have", () => {
  const unsafe = pathsOf(site).filter(path => /[:*?"<>|]/.test(path))

  expect(unsafe).toEqual([])
})
