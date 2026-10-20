export type LiveVideo = { id: string; name: string; description: string }
export type LiveGroup = { id: string; name: string; videos: LiveVideo[] }

export const thumbnailOf = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// The videos that open at once, which are the ones people come for
export const liveVideos: LiveVideo[] = [
  { id: "Mkv6368NCC8", name: "Fireplace", description: "A real fireplace, 24/7" },
  { id: "rFZHOHl-L8A", name: "Lofi hip hop radio", description: "Beats to relax and study to, 24/7" },
  { id: "AT_rjlKyfUY", name: "Rain and thunder", description: "A storm on a dark screen, 24/7" },
  { id: "4xDzrJKXOOY", name: "Synthwave radio", description: "Beats to chill and game to, 24/7" },
]

// The rest, in groups, each of which is a row of its own on the Board
export const liveGroups: LiveGroup[] = [
  {
    id: "music",
    name: "Music",
    videos: [
      { id: "OYCHs8_Fgjk", name: "Cozy bakery jazz", description: "Bossa nova and jazz" },
      { id: "f5KUbyQBUTo", name: "Quiet Chapters radio", description: "Cinematic and neoclassical" },
      { id: "IosjNLdAlnk", name: "Darksynth FM", description: "Dark synthwave" },
    ],
  },
  {
    id: "nature",
    name: "Nature",
    videos: [
      { id: "UQHWkaGATis", name: "Autumn river", description: "Skate Creek forest sounds" },
      { id: "RsM6TmoIUEI", name: "Ocean waves at night", description: "Relaxing sea sounds" },
    ],
  },
  {
    id: "animals",
    name: "Animals",
    videos: [
      { id: "FCgli5GQs9g", name: "Southwest Florida eagle cam", description: "Pond cam" },
      { id: "pe4xqyzhrK8", name: "Winter Park eagle cam", description: "Side fixed cam" },
      { id: "gnF7_gRHHMQ", name: "FalconCam", description: "A falcon nest box" },
      { id: "ZNgrQYq0IRk", name: "Neuse River swamp cam", description: "Bears, deer and more" },
      { id: "9pInqwL0DEY", name: "Aquarium cam", description: "Baltimore, by EarthCam" },
    ],
  },
  {
    id: "space",
    name: "Space",
    videos: [
      { id: "7zmZ2JzuzxA", name: "Earth from the ISS", description: "Space station cameras" },
      { id: "diy2UH9a74k", name: "Earth views from the ISS", description: "Stunning views, 24/7" },
      { id: "lTHD0ZYTV78", name: "Starship at Starbase", description: "Live views from Texas" },
    ],
  },
]

// The best of the groups, by hand: the most watched videos that have kept running, taken from the groups above. It is the one group that is on by default
export const bestGroup: LiveGroup = {
  id: "best",
  name: "Best",
  videos: ["OYCHs8_Fgjk", "f5KUbyQBUTo", "RsM6TmoIUEI", "UQHWkaGATis", "FCgli5GQs9g", "9pInqwL0DEY", "7zmZ2JzuzxA", "diy2UH9a74k"].map(id => {
    const video = liveGroups.flatMap(({ videos }) => videos).find(video => video.id === id)
    if (!video) throw new Error(`The best has a video that is in no group: ${id}`)
    return video
  }),
}
