import {useLyricsPlayer} from "../hooks/useLyricsPlayer.ts";
import {useAudioPlayer} from "../hooks/useAudioPlayer.ts";

const TEST_SONG = "/music.flac"

function LyricsPlayer() {

    const {
        currentTime,
        changeCurrentTime
    } = useAudioPlayer(TEST_SONG);

    const {
        lyrics,
        activeIndex
    } = useLyricsPlayer(currentTime, TEST_SONG)



    return (
        <div className="lyrics-player">
            {lyrics && lyrics.map((lyric, index) => (
                <div
                    key={index}
                    className="lyrics-row-container"
                    onClick={() => {changeCurrentTime(lyric.timestamp)}}
                >
                    <p

                        className={`lyrics-row ${index === activeIndex ? "lyrics-row-active" : "lyrics-row-inactive"} ${!lyric.text && "lyrics-row-empty"}`}>
                        {lyric.text}
                    </p>
                </div>
            ))}
            {!lyrics && <p>No lyrics loaded</p>}
        </div>
    )

}

export default LyricsPlayer;