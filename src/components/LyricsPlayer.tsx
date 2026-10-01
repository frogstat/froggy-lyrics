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
        currentLyricsRef
    } = useLyricsPlayer(currentTime, file)


    return (
        <div className="lyrics-player">
            <div className="lyrics-container">
                {lyrics && lyrics.map((lyric, index) => (
                    <p
                        key={index}
                        onClick={() => {
                            changeCurrentTime(lyric.timestamp)
                        }}
                        ref={index === activeIndex ? currentLyricsRef : undefined}
                        className={`lyrics-row ${index === activeIndex ? "lyrics-row-active" : "lyrics-row-inactive"} ${!lyric.text && "lyrics-row-empty"}`}>
                        {lyric.text.length ? lyric.text : <br/>}
                    </p>
                ))}
                {!lyrics && <p>No lyrics loaded</p>}
            </div>
        </div>
    )

}

export default LyricsPlayer;