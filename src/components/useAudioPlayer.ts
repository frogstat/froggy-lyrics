import {useEffect, useRef, useState} from "react";

const TEST_SONG = "/music.opus"

export function useAudioPlayer() {

    const currentAudio = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (currentAudio.current) {
            currentAudio.current.pause();
            currentAudio.current.currentTime = 0;
        }

        const audio = new Audio(TEST_SONG);
        currentAudio.current = audio;
        setCurrentTime(audio.currentTime);
        audio.play().then(() => {
            console.log(`Playing ${TEST_SONG}`);
        }).catch(error => {
            console.error(`Failed to play ${TEST_SONG}:`, error);
        });

        return () => {
            currentAudio.current?.pause();
            currentAudio.current = null;
        };
    }, []);

    useEffect(() => {
        let timer = setInterval(() => {
            if(currentAudio.current) {
                setCurrentTime(currentAudio.current.currentTime);
            }
        }, 50);

        return () => clearInterval(timer)
    }, []);

    function changeCurrentTime(newTime: number) {
        if (!currentAudio.current ||newTime > currentAudio.current.duration) {
            return;
        }
        currentAudio.current.currentTime = newTime;
        if(currentAudio.current.paused) {
            currentAudio.current.play();
        }
    }

    return {
        currentTime,
        changeCurrentTime
    }
}