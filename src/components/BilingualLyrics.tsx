import type {LyricRow} from "../utils/types.ts";

type BilingualLyricsProps = {
    allLyrics: LyricRow[][] | null,
    currentTime: number,
}

function BilingualLyrics({allLyrics, currentTime}: BilingualLyricsProps) {

    function getLine(lyrics: LyricRow[]) {
        if (!lyrics) {
            return "";
        }

        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].timestamp && lyrics[i].text.length > 0) {
                return lyrics[i].text;
            }
        }
        return "";
    }

    return (
        <div className="lyrics-container-bilingual">
            {allLyrics && allLyrics.map((lyrics, index) =>
                <span key={index} className={"bilingual-lyrics"}>
                    {getLine(lyrics)}
                </span>
            )}

        </div>
    )
}

export default BilingualLyrics