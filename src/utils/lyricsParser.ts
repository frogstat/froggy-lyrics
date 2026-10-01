export type LyricRow = {
    timestamp: number;
    text: string;
}


const TEST_LYRICS_STRING = "[00:01.42] It is time for you to stop all of your sobbing\n" +
    "[00:08.10] Yes it's time for you to stop all of your sobbing, ohh ohh ohh\n" +
    "[00:14.99] There's one thing you gotta do, to make me still want you\n" +
    "[00:21.26] Gotta stop sobbing now, stop sobbing now\n" +
    "[00:27.36] Yeah, yeah, stop, stop, stop, stop\n" +
    "[00:30.64] It is time for you to laugh instead of crying\n" +
    "[00:38.31] Yes it's time for you to laugh so keep on trying, ohh ohh ohh\n" +
    "[00:47.47] There's one thing you gotta do, to make me still want you\n" +
    "[00:55.31] Gotta stop sobbing now, stop sobbing now\n" +
    "[00:58.92] Yeah, yeah, stop it, stop it, stop it, stop it\n" +
    "[01:02.34] Each little tear that falls from your eyes\n" +
    "[01:11.64] Makes, makes me want\n" +
    "[01:14.91] To take you in my arms and tell you\n" +
    "[01:19.45] To stop all your sobbing\n" +
    "[01:37.38] There's one thing you gotta do, to make me still want you\n" +
    "[01:47.83] Then there's one thing you gotta know, to make me want you so\n" +
    "[01:54.66] Gotta stop sobbing now, stop sobbing now\n" +
    "[01:57.15] Yeah, yeah, stop it, stop it, stop it, stop it\n" +
    "[02:00.79] Gotta stop sobbing now, gotta stop sobbing now\n" +
    "[02:03.82] Stop it, stop it, stop it, stop it\n" +
    "[02:05.56] Gotta stop sobbing now, gotta stop sobbing now\n" +
    "[02:07.37] Stop it, stop it, stop it, stop it\n" +
    "[02:13.05]"

const LYRICS_REGEX = /\[(\d{2}):(\d{2}\.\d{2})](.+)?/

function parseRow(row: string): LyricRow {
    const match = row.match(LYRICS_REGEX);
    if (!match) {
        throw Error(`Unrecognized row: ${row}`);
    }
    const minutes = Number(match[0])
    const seconds = Number(match[1])
    const text = match[2]

    return {
        timestamp: minutes * 60 + seconds,
        text: text
    }


}

export function getLyrics(): LyricRow[] {
    const lyrics: LyricRow[] = []
    for (const row of TEST_LYRICS_STRING.split("\n")) {
        const lyricsRow: LyricRow = parseRow(row)
        lyrics.push(lyricsRow)
    }
    return lyrics;
}