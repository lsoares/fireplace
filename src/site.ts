import { type LiveGroup, type LiveVideo, liveGroups, liveVideos, thumbnailOf } from "./live"

export type SiteFile = { path: string; body: string }

// The files of the site that Stremio asks for, with the pictures and pages of the site left to its folder. Stremio asks for everything at the address of the manifest it was
// given, so each choice of groups has a folder of its own: all of them at the root, and the others in `groups=music,space/`, which is the way to choose with no server
export function buildSite(siteUrl: string): SiteFile[] {
  return choicesOfGroups().flatMap(groups => filesOf(siteUrl, groups))
}

// Every choice of the groups, with the others in the order they are in, from all of them to none
function choicesOfGroups(): LiveGroup[][] {
  return Array.from({ length: 2 ** liveGroups.length }, (_, mask) => liveGroups.filter((_, index) => mask & (1 << index))).sort((a, b) => b.length - a.length)
}

function filesOf(siteUrl: string, groups: LiveGroup[]): SiteFile[] {
  const everyone = groups.length === liveGroups.length
  const folder = everyone ? "" : `groups=${groups.map(({ id }) => id).join(",")}/`
  const rows = [
    { id: "live", name: "🔥 Fireplace", videos: liveVideos },
    ...groups.map(({ id, name, videos }) => ({ id, name: `Fireplace · ${name}`, videos })),
  ]
  const videos = rows.flatMap(row => row.videos)
  return [
    ...[
      { path: "manifest.json", body: manifestOf(siteUrl, rows) },
      ...rows.map(row => ({ path: `catalog/movie/${row.id}.json`, body: { metas: row.videos.map(metaOf) } })),
      ...videos.map(video => ({ path: `meta/movie/${idOf(video)}.json`, body: { meta: { ...metaOf(video), background: thumbnailOf(video.id) } } })),
      ...videos.map(video => ({ path: `stream/movie/${idOf(video)}.json`, body: { streams: [{ ytId: video.id, name: "Live" }] } })),
    ].map(({ path, body }) => ({ path: folder + path, body: `${JSON.stringify(body)}\n` })),
    // What Stremio's Configure button opens, at the address of the manifest: the page of the site that chooses the groups, with these chosen
    { path: `${folder}configure/index.html`, body: configurePage(everyone ? "../" : "../../", groups) },
  ]
}

const idOf = ({ id }: LiveVideo) => `fp-${id}`

function metaOf(video: LiveVideo) {
  return { id: idOf(video), type: "movie", name: video.name, description: video.description, poster: thumbnailOf(video.id), posterShape: "landscape" }
}

function manifestOf(siteUrl: string, rows: { id: string; name: string }[]) {
  return {
    id: "community.fireplace",
    version: "0.1.1",
    name: "🔥 Fireplace",
    description: "Cozy live streams, 24/7: a fireplace, lofi, rain and synthwave, and groups of music, nature, animals and space",
    logo: `${siteUrl}/logo.png`,
    resources: ["catalog", "meta", "stream"],
    types: ["movie"],
    idPrefixes: ["fp-"],
    behaviorHints: { configurable: true },
    catalogs: rows.map(({ id, name }) => ({ type: "movie", id, name })),
  }
}

function configurePage(back: string, groups: LiveGroup[]) {
  const to = `${back}?groups=${groups.map(({ id }) => id).join(",")}`
  return `<!doctype html><meta charset="utf-8"><title>Fireplace</title><meta http-equiv="refresh" content="0; url=${to}"><a href="${to}">Choose the groups of Fireplace</a>\n`
}
