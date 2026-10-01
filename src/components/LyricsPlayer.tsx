import {useLyricsPlayer} from "../hooks/useLyricsPlayer.ts";
import {useAudioPlayer} from "./useAudioPlayer.ts";

function LyricsPlayer() {

    const {
        currentTime,
        changeCurrentTime
    } = useAudioPlayer();

    const {
        lyrics,
        activeIndex
    } = useLyricsPlayer(currentTime)



    return (
        <div className="lyrics-player">
            {lyrics && lyrics.map((lyric, index) => (
                <div className="lyrics-row-container" onClick={() => {changeCurrentTime(lyric.timestamp)}}>
                    <p
                        key={index}
                        className={`lyrics-row ${index === activeIndex ? "lyrics-row-active" : "lyrics-row-inactive"} ${!lyric.text && "lyrics-row-empty"}`}>
                        {lyric.text}
                    </p>
                </div>
            ))}
        </div>
    )

}

export default LyricsPlayer;