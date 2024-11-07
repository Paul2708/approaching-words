import LandingPage from "./pages/LandingPage.tsx";
import {useEffect, useState} from "react";
import webSocketService from './services/WebSocketService.js';
import MatchPage from "./pages/MatchPage.tsx";
import {MatchFoundMessage, RevealMessage, SessionMessage, storeSession} from './services/BackendAPI.js'
import WinPage from "./pages/WinPage.tsx";
import {WordPair} from "./components/WordList.tsx";

export default function App() {
    const [mainComponent, setMainComponent] = useState(<LandingPage/>);

    const [opponent, setOpponent] = useState("")
    const [globalWordPairs, setGlobalWordPairs] = useState<WordPair[]>([])

    useEffect(() => {
        webSocketService.connect('ws://localhost:8000');
    }, []);


    useEffect(() => {
        webSocketService.subscribe('SESSION', (data: string): void => {
            const message: SessionMessage = JSON.parse(data)

            storeSession(message.session)
        });

        webSocketService.subscribe('MATCH_FOUND', (data: string): void => {
            const message: MatchFoundMessage = JSON.parse(data)

            setOpponent(message.opponent)
            setMainComponent(<MatchPage opponent={message.opponent} setGlobalWordPairs={setGlobalWordPairs}/>)
        });

        webSocketService.subscribe('REVEAL', (data: string): void => {
            const message: RevealMessage = JSON.parse(data)

            if (message.match_state === "ENDED") {
                setMainComponent(<WinPage opponent={opponent} wordPairs={globalWordPairs}/>)
            }
        });
    }, [globalWordPairs, opponent]);


    return (
        mainComponent
    )
}
