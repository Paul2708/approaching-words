import {useEffect, useRef, useState} from "react";
import WordList, {WordPair} from "../components/WordList.tsx";
import {guess, LockedInMessage, RevealMessage} from "../services/BackendAPI";
import webSocketService from "../services/WebSocketService";
import {addGuessedWord, addHiddenWordFromOpponent, revealWord} from "../util/WordPairsHelper.ts";
import {validateGuess, validateUsername} from "../util/Validator.ts";

export default function MatchPage({opponent, setGlobalWordPairs}) {
    const [clicked, setClicked] = useState(false)
    const [word, setWord] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef(null);

    const [wordPairs, setWordPairs] = useState<WordPair[]>([])

    useEffect(() => {
        const handleUpdate = () => {
            setWordPairs(prevWordPairs => {
                return addHiddenWordFromOpponent(prevWordPairs)
            });

            setGlobalWordPairs(prevWordPairs => {
                return addHiddenWordFromOpponent(prevWordPairs)
            });
        };

        function handleReveal(data: string) {
            const message: RevealMessage = JSON.parse(data)

            setWordPairs(prevWordState => {
                return revealWord(prevWordState, message.opponent_word)
            })

            setGlobalWordPairs(prevWordState => {
                return revealWord(prevWordState, message.opponent_word)
            })

            setClicked(false)
            setWord("")
            inputRef.current.value = "";
        }

        webSocketService.subscribe('LOCKED_IN', handleUpdate);
        webSocketService.subscribe('REVEAL', handleReveal);

        return () => {
            webSocketService.unsubscribe('LOCKED_IN', handleUpdate);
            webSocketService.unsubscribe('REVEAL', handleReveal);
        };
    }, [setGlobalWordPairs]);

    function guessWord() {
        // Validate word
        const error = validateGuess(word);
        if (error) {
            setError(error)
        }

        // Guess word
        setError("")
        setClicked(true)

        guess(word)

        // TODO: Add transition to entry
        setWordPairs(prevWordPairs => {
            return addGuessedWord(prevWordPairs, word)
        })
        setGlobalWordPairs(prevWordPairs => {
            return addGuessedWord(prevWordPairs, word)
        })
    }

    return (
        <div className="p-8 min-h-screen">
            <div className="font-title uppercase text-4xl flex flex-col text-white">
                <div
                    className="self-start drop-shadow-[5px_5px_5px_rgba(0,0,0,1)] animate-move-left-to-right">Approaching
                </div>
                <div className="self-end drop-shadow-[5px_5px_5px_rgba(0,0,0,1)] animate-move-right-to-left">Words</div>
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Your Teammate</div>
                <div
                    className="shadow-2xl border text-white bg-[#BA0505] pl-5 pr-5 pt-2 pb-2 text-3xl mt-4 rounded border-[#363636]">{opponent}
                </div>
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Your Guess</div>
                <div className="pt-5">
                    Enter a word to converge to the same word.
                </div>
                <div className="flex flex-col w-full pl-16 pr-16 pt-5">
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
                </div>
            </div>

            {error !== "" &&
                <div className="flex flex-col items-center pt-2 text-btn-border text-center">
                    {error}
                </div>
            }

            <WordList title="Recent Words" teamMate={opponent} wordPairs={wordPairs}/>
        </div>
    )
}
