import WordList, {WordPair} from "../components/WordList.tsx";
import {revealAllWords} from "../util/WordPairsHelper.ts";
import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";

export interface WinPageProps {
    opponent: string
    wordPairs: WordPair[]
}

export default function WinPage(props: WinPageProps) {
    const wordPairs = revealAllWords(props.wordPairs)

    return (
        <div className="p-8 min-h-screen md:pl-[25%] md:pr-[25%]">
            <Header/>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Your Teammate</div>
                <div
                    className="shadow-2xl border text-white bg-[#BA0505] pl-5 pr-5 pt-2 pb-2 text-3xl mt-4 rounded border-[#363636]">{props.opponent}
                </div>
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-4xl text-center">Congratulations,<br/>You did it!</div>
                <div className="pt-5">
                    After <span className="font-bold">{wordPairs.length} tries</span>, you
                    and {props.opponent} came up with
                    the word <span
                    className="text-[#FFDD00] font-bold">{wordPairs[wordPairs.length - 1].word.text}</span>.
                </div>
            </div>

            <WordList title={"Guesses"} teamMate={props.opponent} wordPairs={wordPairs}/>

            <div className="w-full pl-16 pr-16 lg:pl-44 lg:pr-44 pt-5 flex flex-col items-center">
                <Button text="Play Again" clickHandler={() => window.location.reload()}/>
            </div>
        </div>
    )
}
