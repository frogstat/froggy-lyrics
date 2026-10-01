export type LyricRow = {
    timestamp: number;
    text: string;
}


const TEST_LYRICS_STRING = "[00:48.69] I'll never let you down, boy, I'll never let you go\n" +
    "[00:50.95] Her subtle hint of life is so innocent and scary\n" +
    "[00:55.52] \"So, tell me that you're here, boy,\" she says as if she knows\n" +
    "[01:00.12] When God took her with time, God made me quite alone\n" +
    "[01:04.35] It's like the universe has left me without a place to go\n" +
    "[01:09.59] Without a hint of light to watch the movement glow\n" +
    "[01:13.84] When our song was slowly starting, your memory felt so real\n" +
    "[01:18.78] At first, against my will, but God invented chills\n" +
    "[01:20.75]\n" +
    "[01:23.04] Yeah I, I saw your ghost tonight\n" +
    "[01:29.84] The moment felt so real\n" +
    "[01:34.79] If your eyes stay right on mine\n" +
    "[01:38.89] My wounds would start to heal\n" +
    "[02:05.25] The kids are in a hurry, and I'm just full of fear\n" +
    "[02:09.84] The lights make bodies blurry, it's getting hard enough to hear\n" +
    "[02:13.91] It's like the evidence is cared for and evidently clear\n" +
    "[02:18.73] If I never leave this dance floor, then I'll never leave you here\n" +
    "[02:23.36] Yeah I, I saw your ghost tonight\n" +
    "[02:30.55] The moment felt so real\n" +
    "[02:35.05] If your eyes stay right on mine\n" +
    "[02:39.80] My wounds would start to heal\n" +
    "[02:44.76] I felt your ghost tonight\n" +
    "[02:48.60] And God it felt like hell\n" +
    "[02:53.89] To know you're almost mine\n" +
    "[02:58.56] But dreams are all I feel\n" +
    "[03:28.48] Yeah I, I saw your ghost tonight\n" +
    "[03:35.47] It fucking hurt like hell\n" +
    "[03:40.22] I felt you here tonight\n" +
    "[03:44.72] But dreams can't all be real\n" +
    "[03:49.37] I saw your ghost tonight\n" +
    "[03:54.06] It fucking hurt like hell\n" +
    "[03:58.84] I felt you here tonight\n" +
    "[04:03.36] But dreams can't all be real\n" +
    "[04:07.51]"

const LYRICS_REGEX = /\[(\d{2}):(\d{2}\.\d{2})](.+)?/

function parseRow(row: string): LyricRow {
    row = row.trim()
    const match = row.match(LYRICS_REGEX);
    if (!match) {
        throw Error(`Unrecognized row: ${row}`);
    }
    const minutes = Number(match[1])
    const seconds = Number(match[2])
    const time = minutes * 60 + seconds;

    const text = match[3] ? match[3].trim() : ""

    return {
        timestamp: time,
        text: text
    }


}

export function getLyrics(): LyricRow[] {
    const lyrics: LyricRow[] = []
    for (const row of TEST_LYRICS_STRING.split("\n")) {
        const lyricsRow: LyricRow = parseRow(row)
        console.log(lyricsRow)
        lyrics.push(lyricsRow)
    }

    if (lyrics[0].timestamp > 0){
        lyrics.unshift({
            timestamp: 0,
            text: ""
        })
    }
    return lyrics;
}