import LandingPage from "./pages/LandingPage.tsx";
import {useEffect, useState} from "react";
import webSocketService from './services/WebSocketService.js';
import MatchPage from "./pages/MatchPage.tsx";
import {MatchFoundMessage, RevealMessage, SessionMessage, storeSession} from './services/BackendAPI.js'
import WinPage from "./pages/WinPage.tsx";
import {WordPair} from "./components/WordList.tsx";
import {addClearWordFromOpponent} from "./util/WordPairsHelper.ts";
import notificationService from "./services/NotificationService.ts";

export default function App() {
    const [mainComponent, setMainComponent] = useState(<LandingPage/>);

    const [opponent, setOpponent] = useState("")
    const [globalWordPairs, setGlobalWordPairs] = useState<WordPair[]>([])

    useEffect(() => {
        notificationService.requestPermission()

        webSocketService.connect(import.meta.env.VITE_WS_URL);
    }, []);


    useEffect(() => {
        webSocketService.subscribe('SESSION', (data: string): void => {
            const message: SessionMessage = JSON.parse(data)

            storeSession(message.session)
        });

        webSocketService.subscribe('MATCH_FOUND', (data: string): void => {
            const message: MatchFoundMessage = JSON.parse(data)

            notificationService.send("Match found!", "You are playing together with " + message.opponent + ".")

            setOpponent(message.opponent)
            setMainComponent(<MatchPage opponent={message.opponent} setGlobalWordPairs={setGlobalWordPairs}/>)
        });

        webSocketService.subscribe('REVEAL', (data: string): void => {
            const message: RevealMessage = JSON.parse(data)

            if (message.match_state === "ENDED") {
                setGlobalWordPairs(prevWordPairs => {
                    const words: WordPair[] = addClearWordFromOpponent(prevWordPairs, message.opponent_word)
                    setMainComponent(<WinPage opponent={opponent} wordPairs={words}/>)

                    return words
                })
            }
        });
    }, [globalWordPairs, opponent]);


    return (
        mainComponent
    )
}
