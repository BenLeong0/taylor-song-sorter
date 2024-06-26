// taken from https://github.com/shaynak/taylor-swift-lyrics/blob/main/songs.csv

export const ALBUMS = [
  "Taylor Swift",
  "Beautiful Eyes",
  "Fearless",
  "Speak Now",
  "Red",
  "1989",
  "reputation",
  "Lover",
  "folklore",
  "evermore",
  "Midnights",
  "The Tortured Poets Department",
] as const;
export type Album = (typeof ALBUMS)[number];

export const COLOURS: Record<Album, string> = {
  "Taylor Swift": "#A5C9A5",
  "Beautiful Eyes": "#D9C13A",
  Fearless: "#EFC180",
  "Speak Now": "#C7A8CB",
  Red: "#7A2E39",
  "1989": "#B5E5F8",
  reputation: "#746F70",
  Lover: "#F7B0CC",
  folklore: "#CDC9C1",
  evermore: "#C5AC90",
  Midnights: "#242E47",
  "The Tortured Poets Department": "#231E1A",
} as const;

export type SongEntry = {
  title: string;
  album: Album;
  spotifyId: string;
  spotifyIsPodcast?: boolean;
};

export const SONGS: SongEntry[] = [
  {
    title: "Tim McGraw",
    album: "Taylor Swift",
    spotifyId: "2Fn01AIMyHbha2ceNQeOqw",
  },
  {
    title: "Picture to Burn",
    album: "Taylor Swift",
    spotifyId: "4BYejINgfZF0qKDMEH2cim",
  },
  {
    title: "Teardrops On My Guitar",
    album: "Taylor Swift",
    spotifyId: "2TF4UtYreqNbQ6Z9AccldU",
  },
  {
    title: "A Place In This World",
    album: "Taylor Swift",
    spotifyId: "1oR4MUBpyNrAViC8wPNpfm",
  },
  {
    title: "Cold as You",
    album: "Taylor Swift",
    spotifyId: "569sXXQ7t0jSdqHooi2yqs",
  },
  {
    title: "The Outside",
    album: "Taylor Swift",
    spotifyId: "5Tj2MqcFMf60CaGsKbM1aq",
  },
  {
    title: "Tied Together with a Smile",
    album: "Taylor Swift",
    spotifyId: "2zzxwmoOBnXDT0KnJsoIWk",
  },
  {
    title: "Stay Beautiful",
    album: "Taylor Swift",
    spotifyId: "41sjzdjScVwnxnxADElts6",
  },
  {
    title: "Should've Said No",
    album: "Taylor Swift",
    spotifyId: "6CdaXOq1MWe2JHDalTG01d",
  },
  {
    title: "Mary's Song (Oh My My My)",
    album: "Taylor Swift",
    spotifyId: "2O8sogKJCfVZ4rotBv1vVF",
  },
  {
    title: "Our Song",
    album: "Taylor Swift",
    spotifyId: "1j6gmK6u4WNI33lMZ8dC1s",
  },
  {
    title: "I'm Only Me When I'm With You",
    album: "Taylor Swift",
    spotifyId: "7CzxXgQXurKZCyHz9ufbo1",
  },
  {
    title: "Invisible",
    album: "Taylor Swift",
    spotifyId: "1k3PzDNjg38cWqOvL4M9vq",
  },
  {
    title: "A Perfectly Good Heart",
    album: "Taylor Swift",
    spotifyId: "0YgHuReCSPwTXYny7isLja",
  },
  {
    title: "Beautiful Eyes",
    album: "Beautiful Eyes",
    spotifyId: "0PNawBovWZQtuAl9Q9UXrp",
    spotifyIsPodcast: true,
  },
  {
    title: "I Heart ?",
    album: "Beautiful Eyes",
    spotifyId: "7xxDGCQF4QwnXiH8nW0sqd",
    spotifyIsPodcast: true,
  },
  {
    title: "Fearless",
    album: "Fearless",
    spotifyId: "77sMIMlNaSURUAXq5coCxE",
  },
  {
    title: "Fifteen",
    album: "Fearless",
    spotifyId: "2nqio0SfWg6gh2eCtfuMa5",
  },
  {
    title: "Love Story",
    album: "Fearless",
    spotifyId: "6YvqWjhGD8mB5QXcbcUKtx",
  },
  {
    title: "Hey Stephen",
    album: "Fearless",
    spotifyId: "550erGcdD9n6PnwxrvYqZT",
  },
  {
    title: "White Horse",
    album: "Fearless",
    spotifyId: "5YL553x8sHderRBDlm3NM3",
  },
  {
    title: "You Belong With Me",
    album: "Fearless",
    spotifyId: "1qrpoAMXodY6895hGKoUpA",
  },
  {
    title: "Breathe",
    album: "Fearless",
    spotifyId: "7HC7R2D8WjXVcUHJyEGjRs",
  },
  {
    title: "Tell Me Why",
    album: "Fearless",
    spotifyId: "0k0vFacOHNuArLWMiH60p7",
  },
  {
    title: "You're Not Sorry",
    album: "Fearless",
    spotifyId: "6iiAfo4wTA2CVC3Uwx9uh8",
  },
  {
    title: "The Way I Loved You",
    album: "Fearless",
    spotifyId: "22bPsP2jCgbLUvh82U0Z3M",
  },
  {
    title: "Forever & Always",
    album: "Fearless",
    spotifyId: "1msEuwSBneBKpVCZQcFTsU",
  },
  {
    title: "The Best Day",
    album: "Fearless",
    spotifyId: "6ON9UuIq49xXY9GPmHIYRp",
  },
  {
    title: "Change",
    album: "Fearless",
    spotifyId: "3ExweHKZF9B752DPQByRVT",
  },
  {
    title: "Jump Then Fall",
    album: "Fearless",
    spotifyId: "2m3ObD945KvpE5y9A1eUWm",
  },
  {
    title: "Untouchable",
    album: "Fearless",
    spotifyId: "0tQ9vBYpldCuikPsbgOVKA",
  },
  {
    title: "Come In With The Rain",
    album: "Fearless",
    spotifyId: "1n2wszmJyVkw6FHqyLnQsY",
  },
  {
    title: "Superstar",
    album: "Fearless",
    spotifyId: "51A8eKvvZz9uydvIZ7xRSV",
  },
  {
    title: "The Other Side of the Door",
    album: "Fearless",
    spotifyId: "1cSFlSBdpT4F5vb1frQ231",
  },
  {
    title: "Today Was a Fairytale",
    album: "Fearless",
    spotifyId: "2JoJrsEV15OzbijS47lids",
  },
  {
    title: "You All Over Me",
    album: "Fearless",
    spotifyId: "4CHpVfAhuxNJ3ibExe6kxO",
  },
  {
    title: "Mr. Perfectly Fine",
    album: "Fearless",
    spotifyId: "2CYVETnhM9aytqrazYYwrK",
  },
  {
    title: "We Were Happy",
    album: "Fearless",
    spotifyId: "34V9RiEPe8MNdU32qJsJa1",
  },
  {
    title: "That's When",
    album: "Fearless",
    spotifyId: "7eResoqEJJAVTkQYSqvO3P",
  },
  {
    title: "Don't You",
    album: "Fearless",
    spotifyId: "4uuEGH5SVuzkkSFjo2DEiY",
  },
  {
    title: "Bye Bye Baby",
    album: "Fearless",
    spotifyId: "4qUijfYU8EoIWiY6oSyrgT",
  },
  {
    title: "If This Was a Movie",
    album: "Fearless",
    spotifyId: "0kAZ3H6G9Zac4PMpmobMkj",
  },
  {
    title: "Mine",
    album: "Speak Now",
    spotifyId: "7G0gBu6nLdhFDPRLc0HdDG",
  },
  {
    title: "Sparks Fly",
    album: "Speak Now",
    spotifyId: "3MytWN8L7shNYzGl4tAKRp",
  },
  {
    title: "Back To December",
    album: "Speak Now",
    spotifyId: "79uDOz0zuuWS7HWxzMmTa2",
  },
  {
    title: "Speak Now",
    album: "Speak Now",
    spotifyId: "5xXqyjLicvEpch72qEryFT",
  },
  {
    title: "Dear John",
    album: "Speak Now",
    spotifyId: "1zU8j1x3yi9xalMF96pzKp",
  },
  {
    title: "Mean",
    album: "Speak Now",
    spotifyId: "30Y4CV7A6YqtQtTTo7Ue4j",
  },
  {
    title: "The Story Of Us",
    album: "Speak Now",
    spotifyId: "6dTA6y0C2ReQklntzZl8l3",
  },
  {
    title: "Never Grow Up",
    album: "Speak Now",
    spotifyId: "2EFZ9emtKWEglWUQGEQ3P9",
  },
  {
    title: "Enchanted",
    album: "Speak Now",
    spotifyId: "3sW3oSbzsfecv9XoUdGs7h",
  },
  {
    title: "Better Than Revenge",
    album: "Speak Now",
    spotifyId: "0NwGC0v03ysCYINtg6ns58",
  },
  {
    title: "Innocent",
    album: "Speak Now",
    spotifyId: "12nBPF4Rh4XLFJV0YLN7uj",
  },
  {
    title: "Haunted",
    album: "Speak Now",
    spotifyId: "4tMzIAFTFdqGBQLdfbPces",
  },
  {
    title: "Last Kiss",
    album: "Speak Now",
    spotifyId: "59KOoHFcw5XfICnO57holu",
  },
  {
    title: "Long Live",
    album: "Speak Now",
    spotifyId: "4hqJ4bSlYJOXb6Z4SRmzxs",
  },
  {
    title: "Ours",
    album: "Speak Now",
    spotifyId: "3yNJkriPzWjkkDAWHIAVUq",
  },
  {
    title: "Superman",
    album: "Speak Now",
    spotifyId: "4evLyY5Ue1Wesc61t2KXAU",
  },
  {
    title: "Electric Touch",
    album: "Speak Now",
    spotifyId: "4e3ZNTAV6PCrdYMUrUlMpQ",
  },
  {
    title: "When Emma Falls in Love",
    album: "Speak Now",
    spotifyId: "0zo975x58DlXbZllWvfYhg",
  },
  {
    title: "I Can See You",
    album: "Speak Now",
    spotifyId: "5kHMfzgLZP95O9NBy0ku4v",
  },
  {
    title: "Castles Crumbling",
    album: "Speak Now",
    spotifyId: "4ABYxlb92WBIjHu7TIKmml",
  },
  {
    title: "Foolish One",
    album: "Speak Now",
    spotifyId: "4s8BIKx4Zh6ryAEz8RTlaU",
  },
  {
    title: "Timeless",
    album: "Speak Now",
    spotifyId: "1HCdems7PQZRj42QDWLA0A",
  },
  {
    title: "State of Grace",
    album: "Red",
    spotifyId: "6lzc0Al0zfZOIFsFvBS1ki",
  },
  {
    title: "Red",
    album: "Red",
    spotifyId: "4OAuvHryIVv4kMDNSLuPt6",
  },
  {
    title: "Treacherous",
    album: "Red",
    spotifyId: "3S7HNKPakdwNEBFIVTL6dZ",
  },
  {
    title: "I Knew You Were Trouble",
    album: "Red",
    spotifyId: "6AtZLIzUINvExIUy4QhdjP",
  },
  {
    title: "All Too Well",
    album: "Red",
    spotifyId: "3nsfB1vus2qaloUdcBZvDu",
  },
  {
    title: "22",
    album: "Red",
    spotifyId: "3yII7UwgLF6K5zW3xad3MP",
  },
  {
    title: "I Almost Do",
    album: "Red",
    spotifyId: "2r9CbjYgFhtAmcFv1cSquB",
  },
  {
    title: "We Are Never Ever Getting Back Together",
    album: "Red",
    spotifyId: "5YqltLsjdqFtvqE7Nrysvs",
  },
  {
    title: "Stay Stay Stay",
    album: "Red",
    spotifyId: "7eQj6r5PIdYKEIZjucBMcq",
  },
  {
    title: "The Last Time",
    album: "Red",
    spotifyId: "0y6kdSRCVQhSsHSpWvTUm7",
  },
  {
    title: "Holy Ground",
    album: "Red",
    spotifyId: "7J4b3LVCIGO4CMBDFLPoP6",
  },
  {
    title: "Sad Beautiful Tragic",
    album: "Red",
    spotifyId: "73qMN9bXy7MSPwwGfH3wQr",
  },
  {
    title: "The Lucky One",
    album: "Red",
    spotifyId: "4e5ayHsOLJNLTGfjau2mEw",
  },
  {
    title: "Everything Has Changed",
    album: "Red",
    spotifyId: "7qEUFOVcxRI19tbT68JcYK",
  },
  {
    title: "Starlight",
    album: "Red",
    spotifyId: "7A2cNLRT0YJc1yjxHlKihs",
  },
  {
    title: "Begin Again",
    album: "Red",
    spotifyId: "05GsNucq8Bngd9fnd4fRa0",
  },
  {
    title: "The Moment I Knew",
    album: "Red",
    spotifyId: "0NRHj8hDwwmSPaA41o379r",
  },
  {
    title: "Come Back...Be Here",
    album: "Red",
    spotifyId: "4pNApnaUWAL2J4KO2eqokq",
  },
  {
    title: "Girl At Home",
    album: "Red",
    spotifyId: "0DMVrlMUn01M0IcpDbwgu7",
  },
  {
    title: "Ronan",
    album: "Red",
    spotifyId: "7nWui6jiMM2m9qFmET1Mtj",
  },
  {
    title: "Better Man",
    album: "Red",
    spotifyId: "4OmFmE0fzcMG6g0Y8p4eSD",
  },
  {
    title: "Nothing New",
    album: "Red",
    spotifyId: "01K4zKU104LyJ8gMb7227B",
  },
  {
    title: "Babe",
    album: "Red",
    spotifyId: "0v4z1tuZvn6LGknom9Qx7d",
  },
  {
    title: "Message In A Bottle",
    album: "Red",
    spotifyId: "3z6XUommYDWPHeFhmhhT6j",
  },
  {
    title: "I Bet You Think About Me",
    album: "Red",
    spotifyId: "4CkgMiMqZ5JzW9iYXSTMTL",
  },
  {
    title: "Forever Winter",
    album: "Red",
    spotifyId: "3oGVx9RBmiYGv5ZCecWLkx",
  },
  {
    title: "Run",
    album: "Red",
    spotifyId: "4IQkfUsrwXol38VV3U7t7T",
  },
  {
    title: "The Very First Night",
    album: "Red",
    spotifyId: "6pYNq0ZwpPVazKzsqpf0G8",
  },
  {
    title: "All Too Well (10 Minute Version)",
    album: "Red",
    spotifyId: "5enxwA8aAbwZbf5qCHORXi",
  },
  {
    title: "Welcome To New York",
    album: "1989",
    spotifyId: "4WUepByoeqcedHoYhSNHRt",
  },
  {
    title: "Blank Space",
    album: "1989",
    spotifyId: "0108kcWLnn2HlH2kedi1gn",
  },
  {
    title: "Style",
    album: "1989",
    spotifyId: "3Vpk1hfMAQme8VJ0SNRSkd",
  },
  {
    title: "Out Of The Woods",
    album: "1989",
    spotifyId: "1OcSfkeCg9hRC2sFKB4IMJ",
  },
  {
    title: "All You Had To Do Was Stay",
    album: "1989",
    spotifyId: "2k0ZEeAqzvYMcx9Qt5aClQ",
  },
  {
    title: "Shake It Off",
    album: "1989",
    spotifyId: "50yNTF0Od55qnHLxYsA5Pw",
  },
  {
    title: "I Wish You Would",
    album: "1989",
    spotifyId: "3FxJDucHWdw6caWTKO5b23",
  },
  {
    title: "Bad Blood",
    album: "1989",
    spotifyId: "7oZONwFiFIErZcXAtTu7FY",
  },
  {
    title: "Wildest Dreams",
    album: "1989",
    spotifyId: "27exgla7YBw9DUNNcTIpjy",
  },
  {
    title: "How You Get The Girl",
    album: "1989",
    spotifyId: "733OhaXQIHY7BKtY3vnSkn",
  },
  {
    title: "This Love",
    album: "1989",
    spotifyId: "4WBEj8TeGtRPNJdOmT3WJW",
  },
  {
    title: "I Know Places",
    album: "1989",
    spotifyId: "1ULabO0PEsdJekqVH6G10G",
  },
  {
    title: "Clean",
    album: "1989",
    spotifyId: "0lKUBmEyQfzsQHozyeXzES",
  },
  {
    title: "Wonderland",
    album: "1989",
    spotifyId: "6HRsJu8vcnzYDN4t0570FY",
  },
  {
    title: "You Are In Love",
    album: "1989",
    spotifyId: "0TyGh27YQ5LknmiDhCzJiT",
  },
  {
    title: "New Romantics",
    album: "1989",
    spotifyId: "5M787RexsAiVYjQusM98CV",
  },
  {
    title: '"Slut!"',
    album: "1989",
    spotifyId: "0CD7DzeCsuPJygddqlUVYa",
  },
  {
    title: "Say Don't Go",
    album: "1989",
    spotifyId: "3CCRVu4F91Qp2mnGjmWBrf",
  },
  {
    title: "Now That We Don't Talk",
    album: "1989",
    spotifyId: "5QUIK7ZtziW8kGWo8RqopF",
  },
  {
    title: "Suburban Legends",
    album: "1989",
    spotifyId: "6M9ppdfFjR1AbpUl3Y8DcV",
  },
  {
    title: "Is It Over Now?",
    album: "1989",
    spotifyId: "6IG3sQ8s9nfk6TUlVzRhbN",
  },
  {
    title: "Sweeter Than Fiction",
    album: "1989",
    spotifyId: "0RFCHlNuTeUHIB36VuVbOL",
  },
  {
    title: "Bad Blood (Remix)",
    album: "1989",
    spotifyId: "6qAcApH8obo8eqatCKUHd9",
  },
  {
    title: "...Ready for It?",
    album: "reputation",
    spotifyId: "2yLa0QULdQr0qAIvVwN6B5",
  },
  {
    title: "End Game",
    album: "reputation",
    spotifyId: "2x0WlnmfG39ZuDmstl9xfX",
  },
  {
    title: "I Did Something Bad",
    album: "reputation",
    spotifyId: "4svZDCRz4cJoneBpjpx8DJ",
  },
  {
    title: "Don't Blame Me",
    album: "reputation",
    spotifyId: "1R0a2iXumgCiFb7HEZ7gUE",
  },
  {
    title: "Delicate",
    album: "reputation",
    spotifyId: "6NFyWDv5CjfwuzoCkw47Xf",
  },
  {
    title: "Look What You Made Me Do",
    album: "reputation",
    spotifyId: "1P17dC1amhFzptugyAO7Il",
  },
  {
    title: "So It Goes...",
    album: "reputation",
    spotifyId: "5PxFv9yJEg9dxvbZggykro",
  },
  {
    title: "Gorgeous",
    album: "reputation",
    spotifyId: "1ZY1PqizIl78geGM4xWlEA",
  },
  {
    title: "Getaway Car",
    album: "reputation",
    spotifyId: "0VE4kBnHJUgtMf0dy6DRmW",
  },
  {
    title: "King of My Heart",
    album: "reputation",
    spotifyId: "7HuBDWi18s4aJM8UFnNheH",
  },
  {
    title: "Dancing With Our Hands Tied",
    album: "reputation",
    spotifyId: "7I7JbDv63ZJJsSi24DyJrz",
  },
  {
    title: "Dress",
    album: "reputation",
    spotifyId: "6oVxXO5oQ4pTpO8RSnkzvv",
  },
  {
    title: "This Is Why We Can't Have Nice Things",
    album: "reputation",
    spotifyId: "07NxDD1iKCHbAldceD7QLP",
  },
  {
    title: "Call It What You Want",
    album: "reputation",
    spotifyId: "1GwMQaZz6Au3QLDbjbMdme",
  },
  {
    title: "New Year's Day",
    album: "reputation",
    spotifyId: "7F5oktn5YOsR9eR5YsFtqb",
  },
  {
    title: "I Forgot That You Existed",
    album: "Lover",
    spotifyId: "43rA71bccXFGD4C8GOpIlN",
  },
  {
    title: "Cruel Summer",
    album: "Lover",
    spotifyId: "1BxfuPKGuaTgP7aM0Bbdwr",
  },
  {
    title: "Lover",
    album: "Lover",
    spotifyId: "1dGr1c8CrMLDpV6mPbImSI",
  },
  {
    title: "The Man",
    album: "Lover",
    spotifyId: "3RauEVgRgj1IuWdJ9fDs70",
  },
  {
    title: "The Archer",
    album: "Lover",
    spotifyId: "3pHkh7d0lzM2AldUtz2x37",
  },
  {
    title: "I Think He Knows",
    album: "Lover",
    spotifyId: "2YWtcWi3a83pdEg3Gif4Pd",
  },
  {
    title: "Miss Americana & The Heartbreak Prince",
    album: "Lover",
    spotifyId: "214nt20w5wOxJnY462klLw",
  },
  {
    title: "Paper Rings",
    album: "Lover",
    spotifyId: "4y5bvROuBDPr5fuwXbIBZR",
  },
  {
    title: "Cornelia Street",
    album: "Lover",
    spotifyId: "12M5uqx0ZuwkpLp5rJim1a",
  },
  {
    title: "Death By A Thousand Cuts",
    album: "Lover",
    spotifyId: "2dgFqt3w9xIQRjhPtwNk3D",
  },
  {
    title: "London Boy",
    album: "Lover",
    spotifyId: "1LLXZFeAHK9R4xUramtUKw",
  },
  {
    title: "Soon You'll Get Better",
    album: "Lover",
    spotifyId: "4AYtqFyFbX0Xkc2wtcygTr",
  },
  {
    title: "False God",
    album: "Lover",
    spotifyId: "5hQSXkFgbxjZo9uCwd11so",
  },
  {
    title: "You Need To Calm Down",
    album: "Lover",
    spotifyId: "6RRNNciQGZEXnqk8SQ9yv5",
  },
  {
    title: "Afterglow",
    album: "Lover",
    spotifyId: "1SymEzIT3H8UZfibCs3TYi",
  },
  {
    title: "ME!",
    album: "Lover",
    spotifyId: "2Rk4JlNc2TPmZe2af99d45",
  },
  {
    title: "It's Nice To Have A Friend",
    album: "Lover",
    spotifyId: "1SmiQ65iSAbPto6gPFlBYm",
  },
  {
    title: "Daylight",
    album: "Lover",
    spotifyId: "1fzAuUVbzlhZ1lJAx9PtY6",
  },
  {
    title: "All Of The Girls You Loved Before",
    album: "Lover",
    spotifyId: "4P9Q0GojKVXpRTJCaL3kyy",
  },
  {
    title: "the 1",
    album: "folklore",
    spotifyId: "4pfrrhvplbJZAIsfosGWQP",
  },
  {
    title: "cardigan",
    album: "folklore",
    spotifyId: "0KRYCBwIpWYFNrXOmXbyUh",
  },
  {
    title: "the last great american dynasty",
    album: "folklore",
    spotifyId: "2olxzvoFI9IpxqFeUv7WOX",
  },
  {
    title: "exile",
    album: "folklore",
    spotifyId: "5S4aYQAJOwJMAamANWlICO",
  },
  {
    title: "my tears ricochet",
    album: "folklore",
    spotifyId: "5P2bHCDM2tsgIaYWsZMhu5",
  },
  {
    title: "mirrorball",
    album: "folklore",
    spotifyId: "2I8YAEA1VmCuP1wkJHMpTw",
  },
  {
    title: "seven",
    album: "folklore",
    spotifyId: "76mOLcXOjOEhyY4mMF1l3r",
  },
  {
    title: "august",
    album: "folklore",
    spotifyId: "6nK2pIKFcRc5frrZKHgsiT",
  },
  {
    title: "this is me trying",
    album: "folklore",
    spotifyId: "7cm50Lw03k6VvRauJtkyTj",
  },
  {
    title: "illicit affairs",
    album: "folklore",
    spotifyId: "6DrLROM5MG9bxWHeEG5elq",
  },
  {
    title: "invisible string",
    album: "folklore",
    spotifyId: "2ehRU518I0hYqMGQnk4lDY",
  },
  {
    title: "mad woman",
    album: "folklore",
    spotifyId: "0RP1kqoSPkVXsKiQNhMKzV",
  },
  {
    title: "epiphany",
    album: "folklore",
    spotifyId: "1EXa37LpSvi3OQ9UYQ28rD",
  },
  {
    title: "betty",
    album: "folklore",
    spotifyId: "3IhtE4fkytdrtEfV34UzkD",
  },
  {
    title: "peace",
    album: "folklore",
    spotifyId: "6JlI8Ay77m4nJvZTHvfT1J",
  },
  {
    title: "hoax",
    album: "folklore",
    spotifyId: "0YeDG5HnKnG7jpArkzsSPa",
  },
  {
    title: "the lakes",
    album: "folklore",
    spotifyId: "0eFQWVz0qIxDOvhLpZ40P7",
  },
  {
    title: "willow",
    album: "evermore",
    spotifyId: "2gVhfX2Gy1T9kDuS9azrF7",
  },
  {
    title: "champagne problems",
    album: "evermore",
    spotifyId: "1gcyHQpBQ1lfXGdhZmWrHP",
  },
  {
    title: "gold rush",
    album: "evermore",
    spotifyId: "3Dby3p1m6IOZn2gIIqECgK",
  },
  {
    title: "'tis the damn season",
    album: "evermore",
    spotifyId: "6sQckd3Z8NPxVVKUnavY1F",
  },
  {
    title: "tolerate it",
    album: "evermore",
    spotifyId: "6lCvK2AR2uOKkVFCVlAzzm",
  },
  {
    title: "no body, no crime",
    album: "evermore",
    spotifyId: "6uwfVkaOM1mcMkFmSn35ix",
  },
  {
    title: "happiness",
    album: "evermore",
    spotifyId: "55Vf4bimc1Rtfg0PAQRAo2",
  },
  {
    title: "dorothea",
    album: "evermore",
    spotifyId: "66tOfHVH3aUrscg8vExRV4",
  },
  {
    title: "coney island",
    album: "evermore",
    spotifyId: "2awNGIJHodfLZSClB3PYhz",
  },
  {
    title: "ivy",
    album: "evermore",
    spotifyId: "43Ykum9T72UOPhBN31grpN",
  },
  {
    title: "cowboy like me",
    album: "evermore",
    spotifyId: "52OkpDsU6MmPx1AwGOb6Ap",
  },
  {
    title: "long story short",
    album: "evermore",
    spotifyId: "5VYWxXUpxuxEmCqMLDqICo",
  },
  {
    title: "marjorie",
    album: "evermore",
    spotifyId: "5uICWmZTLkpEVbK22PBP6e",
  },
  {
    title: "closure",
    album: "evermore",
    spotifyId: "6a8aUhYbaQBUI8PcJ5ZmQ6",
  },
  {
    title: "evermore",
    album: "evermore",
    spotifyId: "6Wlq9rqkxrqj5Kls4Kw14H",
  },
  {
    title: "right where you left me",
    album: "evermore",
    spotifyId: "3zwMVvkBe2qIKDObWgXw4N",
  },
  {
    title: "it's time to go",
    album: "evermore",
    spotifyId: "1kdWw77ZpYOkhxeuhzU1j6",
  },
  {
    title: "Lavender Haze",
    album: "Midnights",
    spotifyId: "24emu3sabKISjRkrys28jq",
  },
  {
    title: "Maroon",
    album: "Midnights",
    spotifyId: "6qxvy9Pe4RJIq5JBVbbwbS",
  },
  {
    title: "Anti-Hero",
    album: "Midnights",
    spotifyId: "5qIHFdkW6phMsTZlN2g8Lc",
  },
  {
    title: "Snow On The Beach",
    album: "Midnights",
    spotifyId: "7GA86Uo2jYbj8vIXe2nyWd",
  },
  {
    title: "You're On Your Own, Kid",
    album: "Midnights",
    spotifyId: "6PQOU00xWNrGwCZzboriXy",
  },
  {
    title: "Midnight Rain",
    album: "Midnights",
    spotifyId: "4eKMqf9ZMSclDX7V9Ptg7x",
  },
  {
    title: "Question...?",
    album: "Midnights",
    spotifyId: "7oomkQSYf1ia2VnVEWfFIU",
  },
  {
    title: "Vigilante Shit",
    album: "Midnights",
    spotifyId: "0GKDhq6ZbmSbRHd3eyGlB7",
  },
  {
    title: "Bejeweled",
    album: "Midnights",
    spotifyId: "0VpF6RLdCfPIeYRwMu4tZK",
  },
  {
    title: "Labyrinth",
    album: "Midnights",
    spotifyId: "4bBDkw2KBMX0tcgAaXC83Q",
  },
  {
    title: "Karma",
    album: "Midnights",
    spotifyId: "45R112Jz5hQeKgITXgSXzs",
  },
  {
    title: "Sweet Nothing",
    album: "Midnights",
    spotifyId: "2L09RYwH5Pjzca6PmbUAw3",
  },
  {
    title: "Mastermind",
    album: "Midnights",
    spotifyId: "1QQii3pa5m8MEda0nbkjfw",
  },
  {
    title: "Hits Different",
    album: "Midnights",
    spotifyId: "3xYJScVfxByb61dYHTwiby",
  },
  {
    title: "The Great War",
    album: "Midnights",
    spotifyId: "2VuqMjgoKaOHNM8HpxtXKx",
  },
  {
    title: "Bigger Than The Whole Sky",
    album: "Midnights",
    spotifyId: "71CBDRKmF2VeRKYMG1DFBh",
  },
  {
    title: "High Infidelity",
    album: "Midnights",
    spotifyId: "1SztNGCwEHJEVFx90E5g7D",
  },
  {
    title: "Would've, Could've, Should've",
    album: "Midnights",
    spotifyId: "4txojlesMFQZGWxwz2EeqB",
  },
  {
    title: "Dear Reader",
    album: "Midnights",
    spotifyId: "10GRRCR5fctuOF4GFmATJI",
  },
  {
    title: "You're Losing Me",
    album: "Midnights",
    spotifyId: "3CWq0pAKKTWb0K4yiglDc4",
  },
  {
    title: "Paris",
    album: "Midnights",
    spotifyId: "5tWxKWq1DSP1s9WQ5PWuqu",
  },
  {
    title: "Glitch",
    album: "Midnights",
    spotifyId: "7C0w28EsX0Um2FrZs9gso2",
  },
  {
    title: "Fortnight",
    album: "The Tortured Poets Department",
    spotifyId: "6dODwocEuGzHAavXqTbwHv",
  },
  {
    title: "The Tortured Poets Department",
    album: "The Tortured Poets Department",
    spotifyId: "4PdLaGZubp4lghChqp8erB",
  },
  {
    title: "My Boy Only Breaks His Favorite Toys",
    album: "The Tortured Poets Department",
    spotifyId: "7uGYWMwRy24dm7RUDDhUlD",
  },
  {
    title: "Down Bad",
    album: "The Tortured Poets Department",
    spotifyId: "1kbEbBdEgQdQeLXCJh28pJ",
  },
  {
    title: "So Long, London",
    album: "The Tortured Poets Department",
    spotifyId: "7wAkQFShJ27V8362MqevQr",
  },
  {
    title: "But Daddy I Love Him",
    album: "The Tortured Poets Department",
    spotifyId: "4QMgEffJQuKtjCNvqfRZ0m",
  },
  {
    title: "Fresh Out The Slammer",
    album: "The Tortured Poets Department",
    spotifyId: "7IWcDWOfiooH5hRs9XOVYz",
  },
  {
    title: "Florida!!!",
    album: "The Tortured Poets Department",
    spotifyId: "5ExOm0dh4NyRyAdSAO9hyM",
  },
  {
    title: "Guilty as Sin?",
    album: "The Tortured Poets Department",
    spotifyId: "799KrpEbhZp0MHeiA8YK9P",
  },
  {
    title: "Who's Afraid of Little Old Me?",
    album: "The Tortured Poets Department",
    spotifyId: "2d8UxVNhJinc8uat9PoM9y",
  },
  {
    title: "I Can Fix Him (No Really I Can)",
    album: "The Tortured Poets Department",
    spotifyId: "5chnRTB9qMK3W1M41SnU9s",
  },
  {
    title: "loml",
    album: "The Tortured Poets Department",
    spotifyId: "3YkNIrAvbKNrrwwEd7NVLl",
  },
  {
    title: "I Can Do It With A Broken Heart",
    album: "The Tortured Poets Department",
    spotifyId: "2fPvQfGQEZOKtJ9qXeL4x8",
  },
  {
    title: "The Smallest Man Who Ever Lived",
    album: "The Tortured Poets Department",
    spotifyId: "1xtw1krCR6Dw2KwkXw5z63",
  },
  {
    title: "The Alchemy",
    album: "The Tortured Poets Department",
    spotifyId: "1tuNqJOtRQVHvONR8Lg3MZ",
  },
  {
    title: "Clara Bow",
    album: "The Tortured Poets Department",
    spotifyId: "4d9PtIEVij9jW5OaLinH66",
  },
  {
    title: "The Black Dog",
    album: "The Tortured Poets Department",
    spotifyId: "62E2nR0od0M5HYxuYLaDz7",
  },
  {
    title: "imgonnagetyouback",
    album: "The Tortured Poets Department",
    spotifyId: "1kcwpPDQnqEqmezzXdJTCP",
  },
  {
    title: "The Albatross",
    album: "The Tortured Poets Department",
    spotifyId: "4EF6IyONolQy0bIQXm2EmX",
  },
  {
    title: "Chloe or Sam or Sophia or Marcus",
    album: "The Tortured Poets Department",
    spotifyId: "1rmEsOezwf2lmIZTMAO5Ag",
  },
  {
    title: "How Did It End?",
    album: "The Tortured Poets Department",
    spotifyId: "5Bedn0svl0ZD7RGmJkmKKw",
  },
  {
    title: "So High School",
    album: "The Tortured Poets Department",
    spotifyId: "7Mts0OfPorF4iwOomvfqn1",
  },
  {
    title: "I Hate It Here",
    album: "The Tortured Poets Department",
    spotifyId: "3hlGuz3loYoLfI3bpwieWq",
  },
  {
    title: "thanK you aIMee",
    album: "The Tortured Poets Department",
    spotifyId: "7ogK4lJDVDMU6A6vYR5rvD",
  },
  {
    title: "I Look in People's Windows",
    album: "The Tortured Poets Department",
    spotifyId: "1Zai5UJ2di3qEuR2HeT2s8",
  },
  {
    title: "The Prophecy",
    album: "The Tortured Poets Department",
    spotifyId: "18WFFUIsewmA8g31KAeo3e",
  },
  {
    title: "Cassandra",
    album: "The Tortured Poets Department",
    spotifyId: "0g4fMVo4JjwnIpTfFfLdxS",
  },
  {
    title: "Peter",
    album: "The Tortured Poets Department",
    spotifyId: "3zMDGj4D8ogaYgAIZPeU7S",
  },
  {
    title: "The Bolter",
    album: "The Tortured Poets Department",
    spotifyId: "2913xXOVAIDAqxzV2g4VcU",
  },
  {
    title: "Robin",
    album: "The Tortured Poets Department",
    spotifyId: "2CnjDMdpRjlWv04Xk3s6MW",
  },
  {
    title: "The Manuscript",
    album: "The Tortured Poets Department",
    spotifyId: "1DTRUYVd8rYpla9hhVVwjo",
  },
];
