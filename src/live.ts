export type LiveVideo = { id: string; name: string; description: string }
export type LiveGroup = { id: string; name: string; videos: LiveVideo[] }

export const thumbnailOf = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// The videos that open at once, which are the ones people come for
export const liveVideos: LiveVideo[] = [
  { id: "oH3f8pj0Z3c", name: "Fireplace", description: "A cozy fireplace in 4K, 24/7" },
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
      { id: "anO3EGzvnDY", name: "Quiet Chapters radio", description: "Cinematic and neoclassical" },
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
  {
    id: "asmr",
    name: "ASMR",
    videos: [
      { id: "vHjHk1CXxbY", name: "ASMR for people who don't sleep", description: "Jojo's ASMR, 10+ hours" },
      { id: "-n4MLELSO50", name: "ASMR to sleep, tingle and relax", description: "Jojo's ASMR, 10 hours" },
      { id: "3EnpPgG6IHs", name: "ASMR 24/7 tingly triggers", description: "BlueFridayASMR, no talking" },
      { id: "Bp0Xp54A7iE", name: "ASMR to sleep to", description: "Jojo's ASMR, 10 hours" },
      { id: "gFQ6zSaWkDs", name: "ASMR 24/7 personal attention", description: "Restful Rambles, live" },
      { id: "6fbbT0ygzK4", name: "ASMR 24/7 light triggers", description: "Restful Rambles, live" },
      { id: "XSu2hSE3o24", name: "ASMR for a dreamy night's sleep", description: "Simply Kel, 10+ hours" },
      { id: "E4e1HMfckMo", name: "Slime ASMR 24/7", description: "ASMR Love by T, live" },
      { id: "WwTARGLXspQ", name: "24 hours of pure ASMR", description: "ASMR Love by T" },
      { id: "IPRDnt-YrgY", name: "Never ending ASMR", description: "ASMR Love by T, live" },
    ],
  },
]

// The best of the groups, by hand: the most watched videos that have kept running, taken from the groups above, after the fireplace, which gives the addon its name. It is the one group that is on by default
export const bestGroup: LiveGroup = {
  id: "best",
  name: "Best",
  videos: ["oH3f8pj0Z3c", "OYCHs8_Fgjk", "anO3EGzvnDY", "RsM6TmoIUEI", "UQHWkaGATis", "FCgli5GQs9g", "9pInqwL0DEY", "7zmZ2JzuzxA", "diy2UH9a74k"].map(id => {
    const video = [...liveVideos, ...liveGroups.flatMap(({ videos }) => videos)].find(video => video.id === id)
    if (!video) throw new Error(`The best has a video that is in no group: ${id}`)
    return video
  }),
}
