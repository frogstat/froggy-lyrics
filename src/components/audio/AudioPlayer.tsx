import AudioSeeker from "./AudioSeeker.tsx";
import type {Metadata} from "../../utils/types.ts";

type AudioPlayerProps = {
    metadata: Metadata | null;
    duration: number;
    currentTime: number;
    changeCurrentTime(currentTime: number): void;
}

function AudioPlayer({metadata, duration, currentTime, changeCurrentTime}: AudioPlayerProps) {


    return (
        <div className="audio-player">
            <div className="metadata">
                <p>{metadata?.title}</p>
                <p>{metadata?.album}</p>
                <p>{metadata?.artist}</p>
            </div>
            <div className="cover-and-seeker">
                {metadata?.cover && <img className={"cover-image"} src={metadata.cover} alt="cover"/>}
                <AudioSeeker
                    duration={duration}
                    currentTime={currentTime}
                    changeCurrentTime={changeCurrentTime}
                >
                </AudioSeeker>
            </div>

        </div>
    );
}

export default AudioPlayer;