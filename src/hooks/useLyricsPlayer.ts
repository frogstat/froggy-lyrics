import {useEffect, useMemo, useState} from "react";
import {extractMetadata} from "../utils/metaDataExtractor.ts";
import type {LyricRow} from "../utils/types.ts";


export function useLyricsPlayer(currentTime: number, musicFile:string) {
    const [lyrics, setLyrics] = useState<LyricRow[] | null>();


    useEffect(() => {
        extractMetadata(musicFile).then(result => {
            setLyrics(result.lyrics)
        })
    }, [])


    const activeIndex = useMemo(() => {
        if (!lyrics) {
            return -1;
        }

        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].timestamp) {
                return i
            }
        }
        return 0
    }, [currentTime, lyrics]);

    return {
        lyrics,
        activeIndex
    }
}