import {useState} from "react";
import WordList from "../components/WordList.tsx";

export default function WinPage({opponent, wordPairs}) {
    const [clicked, setClicked] = useState(false)

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
                <div className="text-white text-3xl text-center">Congratulations,<br/>You did it!</div>
                <div className="pt-5">
                    After <span className="font-bold">{wordPairs.length} tries</span>, you and {opponent} came up with the word <span
                    className="text-[#FFDD00] font-bold">{wordPairs[wordPairs.length - 1].word.text}</span>.
                </div>
            </div>

            <WordList title={"Guesses"} teamMate={opponent} wordPairs={wordPairs}/>

            <div className="flex flex-col w-full pl-16 pr-16 pt-5">
                {!clicked ?
                    <button
                        className="bg-btn border-btn-border text-white rounded-2xl border-4 w-full mt-5 p-1"
                        onClick={() => setClicked(true)}
                    >Play Again
                    </button> :
                    <button
                        className="bg-btn-active border-btn-border-active text-white rounded-2xl border-4 w-full mt-5 p-1"
                    >Searching...
                    </button>
                }
            </div>
        </div>
    )
}
