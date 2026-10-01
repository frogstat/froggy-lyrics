import {type ITag, parseBlob} from "music-metadata";
import {parseLyrics} from "./LyricsParser.ts";

const LYRICS_LANGUAGE_REGEX = /lyrics_\w{2}/

function extractAllLyricsTags(nativeTags: ITag[]) {
    return nativeTags
        .filter(tag => {
            const id = tag.id.toLowerCase();
            if (id.toLowerCase() == ("lyrics")){
                return true;
            } else if (LYRICS_LANGUAGE_REGEX.test(id)){
                return true;
            }
            return false;
        })
        .map(tag => parseLyrics(tag.value as string));
}

export async function extractMetadata(file: File) {

    const metadata = await parseBlob(file)


    const nativeTags: ITag[] = Object.values(metadata.native).flat();
    const allLyrics = extractAllLyricsTags(nativeTags);
    console.log("allLyrics", allLyrics);

    return {
        title: metadata.common.title ?? "Unknown",
        album: metadata.common.album ?? "Unknown",
        artist: metadata.common.artist ?? "Unknown",
        lyrics: allLyrics
    }
}

// function extractLyrics(lyricsTag: ILyricsTag[]): LyricRow[] | null {
//     const lyricsList = lyricsTag[0].syncText;
//     if (!lyricsList || !lyricsList.length) {
//         return null;
//     }
//
//     const parsedLyrics: LyricRow[] = [];
//     for (const lyric of lyricsList) {
//         const timestamp = lyric.timestamp;
//         if (!timestamp) {
//             continue;
//         }
//         const text = lyric.text;
//         parsedLyrics.push({
//             timestamp: timestamp / 1000,
//             text: text,
//         })
//     }
//
//     if (!parsedLyrics.length) {
//         return null;
//     }
//
//     return parsedLyrics;
// }