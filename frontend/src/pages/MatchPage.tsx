import {useState} from "react";

export default function MatchPage() {
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
                <div className="text-white text-3xl">Your Guess</div>
                <div className="pt-5">
                    Enter a word to converge to the same word.
                </div>
                <div className="flex flex-col w-full pl-16 pr-16 pt-5">
                    <input className="rounded p-2 border border-black" placeholder="e.g., Apple"
                           disabled={clicked}
                    />
                    {!clicked ?
                        <button
                            className="bg-btn border-btn-border text-white rounded-2xl border-4 w-full mt-5 p-1"
                            onClick={() => setClicked(true)}
                        >Guess
                        </button> :
                        <button
                            className="bg-btn-active border-btn-border-active text-white rounded-2xl border-4 w-full mt-5 p-1"
                        >Waiting...
                        </button>
                    }
                </div>
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Recent Words</div>
                <div className="w-full max-w-4xl pt-2">
                    <div className="flex flex-row w-full">
                        <div className="w-1/2 text-center underline">You</div>
                        <div className="w-1/2 text-center">SharebinAPI</div>
                    </div>
                </div>
                <div className="w-full max-w-4xl bg-[#CA7C7C] text-white shadow-lg rounded">
                    <div className="flex flex-col w-full">

                        <div className="flex w-full">
                            <div className="w-1/2 p-2 text-center">Column 1, Row 1</div>
                            <div className="w-1/2 p-2 text-center blur-sm">abcdefghi</div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-1/2 p-2 text-center">Column 1, Row 2</div>
                            <div className="w-1/2 p-2 text-center">Column 2, Row 2</div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-1/2 p-2 text-center">Column 1, Row 3</div>
                            <div className="w-1/2 p-2 text-center">Column 2, Row 3</div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-1/2 p-2 text-center">Column 1, Row 4</div>
                            <div className="w-1/2 p-2 text-center">Column 2, Row 4</div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-1/2 p-2 text-center">Column 1, Row 5</div>
                            <div className="w-1/2 p-2 text-center">Column 2, Row 5</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
