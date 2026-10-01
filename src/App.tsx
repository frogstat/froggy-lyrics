import './App.css'
import LyricsPlayer from "./components/LyricsPlayer.tsx";
import {useEffect, useState} from "react";


function App() {

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        function handleDrop(event: any) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (!file) {
                return;
            }
            setFile(file);
        }

        function handleDragOver(event:any) {
            event.preventDefault()
        }

        document.addEventListener("dragover", handleDragOver);
        document.addEventListener("drop", handleDrop);

    }, [])

    return (
        <div>
            {file && (
                <LyricsPlayer
                    file={file}
                />
            )}
            {!file && (
                <h1>Drag file here</h1>
            )}
        </div>
    )
}

export default App
