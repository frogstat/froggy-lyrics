import {useEffect, useMemo, useState} from "react";
import {getLyrics, type LyricRow} from "../utils/lyricsParser.ts";


export function useLyricsPlayer(currentTime: number) {
    const [lyrics, setLyrics] = useState<LyricRow[] | null>();


    useEffect(() => {
        setLyrics(getLyrics());
    }, [])


    const activeIndex = useMemo(() => {
        if (!lyrics) {
            return -1;
        }

        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].timestamp) {
                console.log(`Changed index: ${i}`);
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