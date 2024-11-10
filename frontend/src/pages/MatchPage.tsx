import React, {useEffect, useRef, useState} from "react";
import WordList, {WordPair} from "../components/WordList.tsx";
import {guess, RevealMessage} from "../services/BackendAPI";
import webSocketService from "../services/WebSocketService";
import {addGuessedWord, addHiddenWordFromOpponent, revealWord} from "../util/WordPairsHelper.ts";
import {validateGuess} from "../util/Validator.ts";
import Header from "../components/Header.tsx";

export interface MatchPageProps {
    opponent: string
    setGlobalWordPairs: React.Dispatch<React.SetStateAction<WordPair[]>>
}

export default function MatchPage(props: MatchPageProps) {
    const [clicked, setClicked] = useState(false)
    const [word, setWord] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);

    const [wordPairs, setWordPairs] = useState<WordPair[]>([])

    const [disconnected, setDisconnected] = useState(false)

    useEffect(() => {
        const handleUpdate = () => {
            setWordPairs(prevWordPairs => {
                return addHiddenWordFromOpponent(prevWordPairs)
            });

            props.setGlobalWordPairs(prevWordPairs => {
                return addHiddenWordFromOpponent(prevWordPairs)
            });
        };

        function handleReveal(data: string) {
            const message: RevealMessage = JSON.parse(data)

            setWordPairs(prevWordState => {
                return revealWord(prevWordState, message.opponent_word)
            })

            props.setGlobalWordPairs(prevWordState => {
                return revealWord(prevWordState, message.opponent_word)
            })

            setClicked(false)
            setWord("")
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }

        function handleDisconnect() {
            setDisconnected(true)
        }

        webSocketService.subscribe('LOCKED_IN', handleUpdate);
        webSocketService.subscribe('REVEAL', handleReveal);
        webSocketService.subscribe('DISCONNECT', handleDisconnect);

        return () => {
            webSocketService.unsubscribe('LOCKED_IN', handleUpdate);
            webSocketService.unsubscribe('REVEAL', handleReveal);
            webSocketService.unsubscribe('DISCONNECT', handleDisconnect);
        };
    }, [props, props.setGlobalWordPairs]);

    function guessWord() {
        // Validate word
        const error = validateGuess(word);
        if (error) {
            setError(error)
            return
        }

        // Guess word
        setError("")
        setClicked(true)

        guess(word)

        // TODO: Add transition to entry
        setWordPairs(prevWordPairs => {
            return addGuessedWord(prevWordPairs, word)
        })
        props.setGlobalWordPairs(prevWordPairs => {
            return addGuessedWord(prevWordPairs, word)
        })
    }

    return (
        <div className="p-8 min-h-screen md:pl-[25%] md:pr-[25%]">
            <Header/>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Your Teammate</div>
                {!disconnected ?
                    <div
                        className="shadow-2xl border text-white bg-[#BA0505] pl-5 pr-5 pt-2 pb-2 text-3xl mt-4 rounded border-[#363636]">{props.opponent}
                    </div>
                    :
                    <>
                    <div
                        className="shadow-2xl border text-gray-200 bg-gray-500 pl-5 pr-5 pt-2 pb-2 text-3xl mt-4 rounded border-[#363636]">{props.opponent}
                    </div>
                    <div className="pt-5 text-[#BA0505] text-lg">Your teammate disconnected. Reload the page to queue again.</div>
                    </>
                }
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Your Guess</div>
                <div className="pt-5">
                    Enter a word to converge to the same word.
                </div>
                <form className="flex flex-col w-full max-w-2xl pl-16 pr-16 pt-5"
                      onSubmit={(e) => {
                          e.preventDefault();

                          if (!clicked) {
                              guessWord();
                          }
                      }}>
                    <input className="rounded p-2 border border-black" placeholder="e.g., Apple"
                           onChange={(e) => setWord(e.target.value)}
                           disabled={clicked}
                           ref={inputRef}
                    />
                    {!clicked ?
                        <button
                            className="bg-btn border-btn-border text-white rounded-2xl border-4 w-full mt-5 p-1"
                            onClick={() => guessWord()}
                        >Guess
                        </button> :
                        <button
                            className="bg-btn-active border-btn-border-active text-white rounded-2xl border-4 w-full mt-5 p-1"
                        >Waiting...
                        </button>
                    }
                </form>
            </div>

            {error !== "" &&
                <div className="flex flex-col items-center pt-2 text-btn-border text-center">
                    {error}
                </div>
            }

            <WordList title="Recent Words" teamMate={props.opponent} wordPairs={wordPairs}/>
        </div>
    )
}
