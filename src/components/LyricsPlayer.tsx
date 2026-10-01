import {useLyricsPlayer} from "../hooks/useLyricsPlayer.ts";
import {useAudioPlayer} from "../hooks/useAudioPlayer.ts";

type LyricsPlayerProps = {
    file: File
}

function LyricsPlayer({file}: LyricsPlayerProps) {

    const {
        currentTime,
        changeCurrentTime
    } = useAudioPlayer(file);

    const {
        lyrics,
        activeIndex,
        currentLyricsRef,
        switchLyrics,
        numberOfLanguages
    } = useLyricsPlayer(currentTime, file)

    function resolveRowPosition(index: number):string {
        if (index === activeIndex) {
            return "lyrics-row-active"
        } else if (Math.abs(index - activeIndex) === 1) {
            return "lyrics-row-one-apart"
        } else if (Math.abs(index - activeIndex) === 2) {
            return "lyrics-row-two-apart"
        } else if (Math.abs(index - activeIndex) === 3) {
            return "lyrics-row-three-apart"
        }
        return "lyrics-row-inactive"
    }

    return (
        <div className="lyrics-player">
            {numberOfLanguages > 1 && <button onClick={switchLyrics}>Switch Language</button>}
            <div className="lyrics-container">
                {lyrics && lyrics.map((lyric, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            changeCurrentTime(lyric.timestamp)
                        }}
                        ref={index === activeIndex ? currentLyricsRef : undefined}
                        className={`lyrics-row ${resolveRowPosition(index)} ${!lyric.text && "lyrics-row-empty"}`}>
                        {lyric.text.length ? lyric.text : ""}
                    </span>
                ))}
                {!lyrics && <p>No lyrics loaded</p>}
            </div>
        </div>
    )

}

export default LyricsPlayer;