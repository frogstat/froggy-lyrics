import {useEffect, useMemo, useRef, useState} from "react";
import {extractMetadata} from "../utils/metaDataExtractor.ts";
import type {LyricRow} from "../utils/types.ts";


export function useLyricsPlayer(currentTime: number, musicFile: File) {
    const [allLyrics, setAllLyrics] = useState<LyricRow[][] | null>();
    const [lyrics, setLyrics] = useState<LyricRow[] | null>(null);
    const currentLyricsRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        extractMetadata(musicFile).then(result => {
            setAllLyrics(result.lyrics)
            setLyrics(() => result.lyrics.length ? result.lyrics[0] : null)
        })
    }, [musicFile])


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

    const numberOfLanguages =
        useMemo(() => allLyrics ? allLyrics.length : 0, [allLyrics]);

    useEffect(() => {
        currentLyricsRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth"
        });

    }, [activeIndex]);

    function switchLyrics() {
        if (!allLyrics || allLyrics.length < 2 || !lyrics) {
            return;
        }
        const currentIndex = allLyrics.indexOf(lyrics);
        if (currentIndex >= allLyrics.length - 1) {
            setLyrics(allLyrics[0]);
        } else {
            setLyrics(allLyrics[currentIndex + 1])
        }
    }

    return {
        lyrics,
        activeIndex,
        currentLyricsRef,
        switchLyrics,
        numberOfLanguages
    }
}