import {useLyricsPlayer} from "../hooks/useLyricsPlayer.ts";
import {useAudioPlayer} from "../hooks/useAudioPlayer.ts";
import ScrollDownLyrics from "./ScrollDownLyrics.tsx";
import {useState} from "react";
import BilingualLyrics from "./BilingualLyrics.tsx";

type LyricsPlayerProps = {
    file: File
}

function LyricsPlayer({file}: LyricsPlayerProps) {

    const [scrollDownMode, setScrollDownMode] = useState<boolean>(true);

    const {
        currentTime,
        changeCurrentTime
    } = useAudioPlayer(file);

    const {
        lyrics,
        activeIndex,
        currentLyricsRef,
        switchLyrics,
        numberOfLanguages,
        allLyrics
    } = useLyricsPlayer(currentTime, file, scrollDownMode)

    function resolveDisplayMode() {
        if (scrollDownMode) {
            return (
                <ScrollDownLyrics
                    lyrics={lyrics}
                    changeCurrentTime={changeCurrentTime}
                    activeIndex={activeIndex}
                    currentLyricsRef={currentLyricsRef}>
                </ScrollDownLyrics>
            )
        }
        return (
            <BilingualLyrics
                allLyrics={allLyrics ?? null}
                currentTime={currentTime}
            >
            </BilingualLyrics>)
    }

    return (
        <div className="lyrics-player">
            {numberOfLanguages > 1 && <button onClick={switchLyrics}>Switch Language</button>}
            <button onClick={() =>
                setScrollDownMode(prev => !prev)
            }>Switch Mode</button>
            {resolveDisplayMode()}
        </div>
    )

}

export default LyricsPlayer;