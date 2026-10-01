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

    function handleColor(index: number, activeIndex: number) {

        if (index === activeIndex) {
            return {opacity: 1, transition: "ease 300ms", cursor: "pointer"}
        }

        return {opacity: 0.1, transition: "ease 300ms", cursor: "pointer"}

    }


    return (
        <div className="lyrics-player">
            <p>{activeIndex == -1 ? "Loading" : activeIndex}</p>
            <p>{currentTime}</p>
            {lyrics && lyrics.map((lyric, index) => (
                <p
                    key={index}
                    onClick={() => {changeCurrentTime(lyric.timestamp)}}
                    style={handleColor(index, activeIndex)}>
                    {lyric.text}
                </p>
            ))}
        </div>
    )

}

export default LyricsPlayer;