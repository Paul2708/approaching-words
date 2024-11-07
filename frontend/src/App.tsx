import LandingPage from "./pages/LandingPage.tsx";
import {useEffect, useState} from "react";
import webSocketService from './services/WebSocketService.js';
import MatchPage from "./pages/MatchPage.tsx";
import {setSession} from './services/BackendAPI.js'
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
        const handleMatchFound = (data) => {
            console.log(data)

            setOpponent(data.opponent)
            setMainComponent(<MatchPage opponent={data.opponent} setGlobalWordPairs={setGlobalWordPairs}/>)
        };

        webSocketService.subscribe('SESSION', (data) => {
            setSession(data.session)
        });
        webSocketService.subscribe('REVEAL', (data) => {
            console.log(data)
            console.log(opponent)
            if (data.match_state === "ENDED") {
                setMainComponent(<WinPage opponent={opponent} wordPairs={globalWordPairs}/>)
            }
        });
        webSocketService.subscribe('MATCH_FOUND', handleMatchFound);

        return () => {
            webSocketService.unsubscribe('MATCH_FOUND', handleMatchFound);
        };
    }, [globalWordPairs, opponent]);


    return (
        mainComponent
    )
}
