import { bestGroup, type LiveGroup, type LiveVideo, liveGroups, liveVideos, thumbnailOf } from "./live"

export type SiteFile = { path: string; body: string }

// The files of the site that Stremio asks for, with the pictures and pages of the site left to its folder. Stremio asks for everything at the address of the manifest it was
// given, so each choice of groups has a folder of its own: the one that is on by default (only the best) at the root, and the others in `groups=best,space/`, which is the way to choose with no server
export function buildSite(siteUrl: string): SiteFile[] {
  return choicesOfGroups().flatMap(groups => filesOf(siteUrl, groups))
}

// Every choice of the groups, with the others in the order they are in, from all of them to none
function choicesOfGroups(): LiveGroup[][] {
  return Array.from({ length: 2 ** groups.length }, (_, mask) => groups.filter((_, index) => mask & (1 << index))).sort((a, b) => b.length - a.length)
}

// The best comes first among the groups, and is the only one on by default
const groups = [bestGroup, ...liveGroups]

function filesOf(siteUrl: string, chosen: LiveGroup[]): SiteFile[] {
  const byDefault = chosen.length === 1 && chosen[0] === bestGroup
  const folder = byDefault ? "" : `groups=${chosen.map(({ id }) => id).join(",")}/`
  // The row of the videos that open at once is always the first, then the groups; a video that is in two rows has its files once
  const rows = [
    { id: "live", name: "🔥 Fireplace", videos: liveVideos },
    ...chosen.map(({ id, name, videos }) => ({ id, name: `Fireplace · ${name}`, videos })),
  ]
  const videos = [...new Map(rows.flatMap(row => row.videos).map(video => [video.id, video])).values()]
  return [
    ...[
      { path: "manifest.json", body: manifestOf(siteUrl, rows) },
      ...rows.map(row => ({ path: `catalog/movie/${row.id}.json`, body: { metas: row.videos.map(metaOf) } })),
      ...videos.map(video => ({ path: `meta/movie/${idOf(video)}.json`, body: { meta: { ...metaOf(video), background: thumbnailOf(video.id) } } })),
      ...videos.map(video => ({ path: `stream/movie/${idOf(video)}.json`, body: { streams: [{ ytId: video.id, name: "Live" }] } })),
    ].map(({ path, body }) => ({ path: folder + path, body: `${JSON.stringify(body)}\n` })),
    // What Stremio's Configure button opens, at the address of the manifest: the page of the site that chooses the groups, with these chosen
    { path: `${folder}configure/index.html`, body: configurePage(byDefault ? "../" : "../../", chosen) },
  ]
}

const idOf = ({ id }: LiveVideo) => `fp-${id}`

function metaOf(video: LiveVideo) {
  return { id: idOf(video), type: "movie", name: video.name, description: video.description, poster: thumbnailOf(video.id), posterShape: "landscape" }
}

function manifestOf(siteUrl: string, rows: { id: string; name: string }[]) {
  return {
    id: "community.fireplace",
    version: "0.2.0",
    name: "🔥 Fireplace",
    description:
      "Cozy live streams, 24/7: a fireplace, lofi, rain and synthwave first, then the best of music, nature, animals, space, ASMR and trains, and groups of each",
    logo: `${siteUrl}/logo.png`,
    resources: ["catalog", "meta", "stream"],
    types: ["movie"],
    idPrefixes: ["fp-"],
    behaviorHints: { configurable: true },
    // What the catalogue of addons gives, to show that this is the addon it lists
    stremioAddonsConfig: {
      issuer: "https://stremio-addons.net",
      signature:
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..3nKPwuJUuO_0uRxU__grXA.KemsvWzISPr_Oudh8ax6GjUMSh62Ttccky13U7rs6v8vnDq28VdS3WBhzzGsFGMZ2fdomk3_nTU5ml8i5fpsLMEZCJmbVfPN6ATnS_kD30nGS0BVLSMKWyhW_YFKorjY._kYZ4FjwWef1BbiR_hADtA",
    },
    catalogs: rows.map(({ id, name }) => ({ type: "movie", id, name })),
  }
}

function configurePage(back: string, chosen: LiveGroup[]) {
  const to = `${back}?groups=${chosen.map(({ id }) => id).join(",")}`
  return `<!doctype html><meta charset="utf-8"><title>Fireplace</title><meta http-equiv="refresh" content="0; url=${to}"><a href="${to}">Choose the groups of Fireplace</a>\n`
}
