import {type ILyricsTag, parseBlob} from "music-metadata";
import type {LyricRow} from "./types.ts";


export async function extractMetadata(filePath: string) {

    const res = await fetch(filePath);
    const blob = await res.blob();
    const metadata = await parseBlob(blob)

    const lyricsTag = metadata.common.lyrics;
    const lyrics = lyricsTag ? extractLyrics(lyricsTag) : null;

    return {
        title: metadata.common.title ?? "Unknown",
        album: metadata.common.album ?? "Unknown",
        artist: metadata.common.artist ?? "Unknown",
        lyrics: lyrics
    }
}

function extractLyrics(lyricsTag: ILyricsTag[]): LyricRow[] | null {
    const lyricsList = lyricsTag[0].syncText;
    if (!lyricsList || !lyricsList.length) {
        return null;
    }

    const parsedLyrics: LyricRow[] = [];
    for (const lyric of lyricsList) {
        const timestamp = lyric.timestamp;
        if (!timestamp) {
            continue;
        }
        const text = lyric.text;
        parsedLyrics.push({
            timestamp: timestamp / 1000,
            text: text,
        })
    }

    if (!parsedLyrics.length) {
        return null;
    }

    return parsedLyrics;
}