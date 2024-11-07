import {useState} from "react";
import {joinQueue} from "../services/BackendAPI.js";
import {validateUsername} from "../util/Validator.ts";

export default function LandingPage() {
    const [username, setUsername] = useState("")
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState("")

    function searchGame() {
        // Validate username
        const error = validateUsername(username);
        if (error) {
            setError(error)
        }

        // Search game
        setError("")
        setClicked(true)

        joinQueue(username)
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
                <div className="text-white text-3xl">How does it work?</div>
                <div className="pt-5">
                    Together with a random player, you have to come up with the same word.
                    To do this, you have to get closer word by word.
                </div>
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Let's getting started!</div>
                <div className="pt-5">
                    Choose your username and search for a game.
                </div>
                <div className="flex flex-col w-full pl-16 pr-16 pt-5">
                    <input className="rounded p-2 border border-black" placeholder="e.g., SharebinAPI"
                           onChange={(e) => setUsername(e.target.value)}
                           disabled={clicked}
                    />
                    {!clicked ?
                        <button
                            className="bg-btn border-btn-border text-white rounded-2xl border-4 w-full mt-5 p-1"
                            onClick={() => searchGame()}
                        >Search
                        </button> :
                        <button
                            className="bg-btn-active border-btn-border-active text-white rounded-2xl border-4 w-full mt-5 p-1"
                        >Searching...
                        </button>
                    }
                </div>
            </div>

            {error !== "" &&
                <div className="flex flex-col items-center pt-2 text-btn-border text-center">
                    {error}
                </div>
            }
        </div>
    )
}
