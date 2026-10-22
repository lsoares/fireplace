export type LiveVideo = { id: string; name: string; description: string }
export type LiveGroup = { id: string; name: string; videos: LiveVideo[] }

export const thumbnailOf = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// What the site shows of a pool: the first videos of it that YouTube lets embed, up to this many
export const rowSize = 10

// Every video of the pools, once, to test which of them can be embedded
export const allVideoIds = () => [...new Set([...liveSlots.flat(), ...liveGroups.flatMap(({ videos }) => videos)].map(({ id }) => id))]

// The videos that open at once, which are the ones people come for: a fireplace, lofi, rain and synthwave. Each is a few videos of its kind, from the one to prefer to the
// last to turn to, as the site shows the first of each that can be embedded; the fireplace is the first, and is the addon's name
export const liveSlots: LiveVideo[][] = [
  [
    { id: "oH3f8pj0Z3c", name: "Fireplace", description: "A cozy fireplace in 4K, 24/7" },
    { id: "vTjaNTgResk", name: "Cozy fireplace", description: "Logs and crackling fire, 4K, 24/7" },
    { id: "mKCieTImjvU", name: "Cozy fireplace, live", description: "FOBOS PLANET, 4K, 24/7" },
    { id: "WsrK19k6Xz4", name: "Cozy fireplace for sleep", description: "Leo's Fireplace, live" },
    { id: "aeN0kuZ3bn0", name: "Fireplace, no ads", description: "Fireplace Classic, live 24/7" },
    { id: "ITBtNXd5WJs", name: "Crackling fireplace", description: "Burning logs, live 24/7" },
    { id: "FXlUENuL5HA", name: "Fireplace for long sleep", description: "Soft crackling, live" },
  ],
  [
    { id: "rFZHOHl-L8A", name: "Lofi hip hop radio", description: "Beats to relax and study to, 24/7" },
    { id: "JD-kMIpDfnY", name: "Lofi radio to sleep", description: "Beats to sleep and chill to, 24/7" },
    { id: "7oHxpusmRfU", name: "Cozy lofi room", description: "Chill lofi beats to study, 24/7" },
    { id: "5yx6BWlEVcY", name: "Chillhop radio", description: "Jazzy and lofi hip hop beats, 24/7" },
  ],
  [
    { id: "cI0zN1nG3PQ", name: "Rain and thunder", description: "A storm on a dark screen, 24/7" },
    { id: "0V0SKiiFZMs", name: "Heavy rain and thunder", description: "Black screen to sleep, 24/7" },
    { id: "Dfm2rB-nQ9Y", name: "Rain and thunder, no ads", description: "Sleep Soundly, 24/7" },
    { id: "aqKdwOkFu9Y", name: "Rain sounds to fall asleep", description: "Live 24/7" },
    { id: "XV5BvxAj4dI", name: "Rain and thunder, black screen", description: "Rain Haven, live" },
  ],
  [
    { id: "4xDzrJKXOOY", name: "Synthwave radio", description: "Beats to chill and game to, 24/7" },
    { id: "UedTcufyrHc", name: "ChillSynth FM", description: "Lofi synthwave for retro dreaming" },
    { id: "UjlMEqTu2KI", name: "Nightride FM", description: "24/7 synthwave radio" },
    { id: "I4o3zVGvBwA", name: "Escape into the neon", description: "24/7 synthwave radio" },
  ],
]

// The rest, in groups, each of which is a row of its own on the Board. Each is a pool with more videos than the row has room for, from the most to the least to prefer, as
// those that can no longer be embedded are left out when the site is built
export const liveGroups: LiveGroup[] = [
  {
    id: "music",
    name: "Music",
    videos: [
      { id: "OYCHs8_Fgjk", name: "Cozy bakery jazz", description: "Bossa nova and jazz" },
      { id: "IosjNLdAlnk", name: "Darksynth FM", description: "Dark synthwave" },
      { id: "E2vONfzoyRI", name: "Jazz lofi radio", description: "Lofi Girl, beats to chill and study to" },
      { id: "V-mss50iInU", name: "Relax bossa", description: "Bossa nova covers, live 24/7" },
      { id: "jeZbRuPPlqc", name: "Velvet Cat noir jazz", description: "Vintage jazz cafe, live 24/7" },
      { id: "Dx5qFachd3A", name: "Jazz piano radio", description: "Slow jazz music, 24/7" },
      { id: "3PFJ9SETS4M", name: "Lofi house radio", description: "Lounge music to vibe to" },
      { id: "AZRWixZJr-Y", name: "Vintage evening jazz", description: "1930s and 1940s swing radio" },
      { id: "xORCbIptqcc", name: "Sleep ambient radio", description: "Lofi Girl, music to fall asleep to" },
      { id: "c18WZZa4KIA", name: "Fall coffee shop jazz", description: "Bookstore ambience, hours long" },
      { id: "iBeKujv18OI", name: "Rainy day coffee shop", description: "Smooth jazz, hours long" },
      { id: "WLWJy1eXX2c", name: "Classical piano, 8 hours", description: "Chopin, Debussy, Mozart and more" },
      { id: "BB4m143c-O8", name: "The best of piano", description: "Mozart, Beethoven, Chopin, hours long" },
      { id: "3Lfr3BhvkQY", name: "24 hours of piano", description: "Relaxing piano music" },
    ],
  },
  {
    id: "nature",
    name: "Nature",
    videos: [
      { id: "UQHWkaGATis", name: "Autumn river", description: "Skate Creek forest sounds" },
      { id: "_BMi3usEwi8", name: "Ocean waves", description: "Tropical beach in 4K, 24/7" },
      { id: "J7ZrIDvqlic", name: "Brooks Falls bears", description: "Katmai, Alaska, explore.org live" },
      { id: "8kEzFZvtLzM", name: "Woodland stream", description: "Birdsong and calm water, live" },
      { id: "EU_-InlIg_I", name: "Peaceful river", description: "River water and forest birds, live" },
      { id: "F0GOOP82094", name: "Forest wildlife cam", description: "Live in the forest, Denmark" },
      { id: "LnD-XEQ2hzQ", name: "Ocean waves at night", description: "Low pitch sleep waves, live" },
      { id: "R2OFkadShv4", name: "Moonlit ocean porch", description: "Ocean waves, live 24/7" },
      { id: "UI0KO1gHk18", name: "Ocean waves for deep sleep", description: "Beach sounds all night, live" },
      { id: "Ts_uWr9-lAU", name: "Relaxing ocean waves", description: "Peaceful beach sounds, live" },
      { id: "ItjcFGbp_tM", name: "Peaceful blue ocean waves", description: "Tropical calm, live 24/7" },
      { id: "bn9F19Hi1Lk", name: "Ocean sounds, 11 hours", description: "Stereo waves to sleep to" },
      { id: "HchoJcYNYlU", name: "Waterfall sounds", description: "Relaxing, hours long" },
      { id: "6uhRxK_EOm4", name: "Autumn river sounds", description: "Relaxing nature video, hours long" },
      { id: "nE_XAauwu1I", name: "Rain and river sounds", description: "Near a beautiful forest, hours long" },
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
      { id: "B4-L2nfGcuE", name: "Big Bear eagle nest", description: "Bald eagles, cam 1" },
      { id: "41eq4VzCYc4", name: "Big Bear eagle, wide view", description: "Bald eagles, cam 2" },
      { id: "x10vL6_47Dw", name: "Cornell FeederWatch cam", description: "Birds at Sapsucker Woods" },
      { id: "-K-VxA6v7QM", name: "Alveus Sanctuary", description: "Animal ambassadors, live cams" },
      { id: "HHp4rjhJsWI", name: "Moody Gardens penguins", description: "Penguin habitat, live" },
      { id: "y9t1g8Ike6g", name: "Gettysburg bird feeder", description: "Wildlife cam, Pennsylvania" },
      { id: "XsOU8JnEpNM", name: "Ol Donyo Lodge", description: "Wildlife stream, Kenya" },
      { id: "xCLTpcx9aO8", name: "4K aquarium", description: "Underwater life, live" },
      { id: "uhJoXRgVd_8", name: "Comb jellies", description: "Monterey Bay Aquarium, 12 hours" },
      { id: "sEH3pOhj0xs", name: "Neon jellyfish aquarium", description: "Relaxing music, hours long" },
    ],
  },
  {
    id: "space",
    name: "Space",
    videos: [
      { id: "7zmZ2JzuzxA", name: "Earth from the ISS", description: "Space station cameras" },
      { id: "tj4knR4r1UU", name: "NASA live stream of Earth", description: "From the ISS, 24/7" },
      { id: "lTHD0ZYTV78", name: "Starship at Starbase", description: "Live views from Texas" },
      { id: "mhJRzQsLZGg", name: "Starbase live", description: "NASASpaceflight, Starship and Super Heavy" },
      { id: "fO9e9jnhYK8", name: "Earth and space in 4K", description: "24/7 livestream of Earth" },
      { id: "4QJEibrt9B8", name: "ISS live", description: "Earth from space, 24/7" },
      { id: "ROboUHfPUrU", name: "NASA views from the ISS", description: "Live high-definition views" },
      { id: "M3HKLzjvKPc", name: "NASA ISS official stream", description: "Live video from the station" },
      { id: "OKQEMp2555A", name: "ISS overview camera", description: "View Earth from the station, live" },
      { id: "TAkk2B9GOmc", name: "ISS live tracker", description: "NASA Earth and station tracker" },
      { id: "xONYM4PxVNA", name: "ISS live in 4K", description: "Earth from space, NASA views" },
      { id: "wnhvanMdx4s", name: "Earth from space, 10 hours", description: "4K with space wind audio" },
      { id: "pLBda_P7leU", name: "Interstellar journey", description: "Deep space ambient music, hours long" },
      { id: "Z8FBnz6USIM", name: "Space ambient music", description: "24 hours of cosmic music" },
      { id: "10rf_KZAdLI", name: "Voyager 1 deep space", description: "Ambience for sleep, live" },
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
      { id: "jbAy9MwBR-I", name: "ASMR tapping and triggers", description: "10 hours of trigger sounds" },
    ],
  },
  {
    id: "trains",
    name: "Trains",
    videos: [
      { id: "7xdHH9KMSVk", name: "Flagstaff train camera", description: "Virtual Railfan, live from Arizona" },
      { id: "3rDjPLvOShM", name: "Train to the Arctic Circle, winter", description: "Norway, SlowTV, 10 hours" },
      { id: "pyyJQD91qMU", name: "Luxury train ride", description: "Train sounds to sleep to, 10 hours" },
      { id: "P0-ymKmO1vI", name: "Trans-Siberian on a rainy night", description: "Train and rain sounds, 10 hours" },
      { id: "vXCB1zGGFiY", name: "Train through the fog in Switzerland", description: "4K, 8 hours" },
      { id: "tmlE1ct0cYk", name: "Trainspotting at Prague Main Station", description: "Live in 4K" },
      { id: "yCtt26c_AOg", name: "Train to the Arctic Circle, summer", description: "Norway, SlowTV, 10 hours" },
      { id: "gzV7uUxwgwI", name: "London Underground first person", description: "Live journey, 24/7" },
      { id: "HpgnXXHsmfE", name: "Tram driver's view", description: "POV cab view, live 24/7" },
      { id: "wxPi28clpk8", name: "RailCam Netherlands", description: "Live trains" },
      { id: "L6eG4ahJc_Q", name: "Fort Madison train camera", description: "Virtual Railfan, Iowa, live" },
      { id: "fIMbMz2P7Bs", name: "Revelstoke train camera", description: "Virtual Railfan, Canada, live" },
      { id: "mexGMd6-8ik", name: "Model trains railcam", description: "Fort Madison Spring Creek, live" },
      { id: "S3AQlR-qbOI", name: "Fostoria rail cam", description: "RailStream, Ohio, live" },
      { id: "XjAxqeAMEo8", name: "Train sounds and blizzard", description: "Twilight ride, hours long" },
      { id: "-xiF9YIIUk4", name: "Train sounds and rain", description: "All aboard, hours long" },
      { id: "GLQhbRGv5qU", name: "Tokyo Shinjuku live cam", description: "JR trains, live" },
      { id: "zM3XD4Dhzk4", name: "Hannover train traffic", description: "ICEs and freight trains, live" },
    ],
  },
]

// The best of the groups, by hand: the most watched videos that have kept running, taken from the pools above (the fireplace is put in front of them when the site is built).
// It is the one group that is on by default
export const bestGroup: LiveGroup = {
  id: "best",
  name: "Best",
  videos: [
    "OYCHs8_Fgjk",
    "IosjNLdAlnk",
    "UQHWkaGATis",
    "_BMi3usEwi8",
    "FCgli5GQs9g",
    "9pInqwL0DEY",
    "B4-L2nfGcuE",
    "7zmZ2JzuzxA",
    "tj4knR4r1UU",
    "4QJEibrt9B8",
    "E2vONfzoyRI",
    "J7ZrIDvqlic",
    "xCLTpcx9aO8",
  ].map(id => {
    const video = [...liveSlots.flat(), ...liveGroups.flatMap(({ videos }) => videos)].find(video => video.id === id)
    if (!video) throw new Error(`The best has a video that is in no pool: ${id}`)
    return video
  }),
}
