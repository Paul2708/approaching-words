import {useState} from "react";
import WordList, {WordPair} from "../components/WordList.tsx";

export default function MatchPage() {
    const [clicked, setClicked] = useState(false)
    const [word, setWord] = useState("")
    const [error, setError] = useState("")

    const wordPairs: WordPair[] = [
        {
            word: {
                text: "",
                hidden: false
            },
            teamMateWord: {
                text: "abcdefghi",
                hidden: true
            },
        },
        {
            word: {
                text: "apple",
                hidden: false
            },
            teamMateWord: {
                text: "chess",
                hidden: false
            },
        }
    ]

    function guessWord() {
        // Validate word
        if (word.length > 32) {
            setError("The word is too long. Only 32 characters are allowed.")
            return
        }

        const regex = /^[a-zA-Z-]+$/
        if (!regex.test(word)) {
            setError("The word contains illegal characters. Only letters and - are allowed.")
            return;
        }

        // Guess word
        setError("")
        setClicked(true)

        console.log(word)
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
                    className="shadow-2xl border text-white bg-[#BA0505] pl-5 pr-5 pt-2 pb-2 text-3xl mt-4 rounded border-[#363636]">SharebinAPI
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

            <WordList title="Recent Words" teamMate="SharebinAPI" wordPairs={wordPairs}/>
        </div>
    )
}
