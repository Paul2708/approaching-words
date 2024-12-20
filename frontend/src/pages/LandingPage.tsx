import {useState} from "react";
import {joinQueue} from "../services/BackendAPI.js";
import {validateUsername} from "../util/Validator.ts";
import Header from "../components/Header.tsx";
import notificationService from "../services/NotificationService.ts";
import webSocketService from "../services/WebSocketService.ts";
import Button from "../components/Button.tsx";

export default function LandingPage() {
    const [username, setUsername] = useState("")
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState("")

    webSocketService.handleDisconnect(() => {
        setError("You lost the connection to the website. Please reload the page and queue again.")

        notificationService.send("Connection lost", "Please reload the page and queue again.")
    })

    function searchGame() {
        // Validate username
        const error = validateUsername(username);
        if (error) {
            setError(error)
            return
        }

        // Search game
        setError("")
        setClicked(true)

        joinQueue(username)
    }

    return (
        <div className="p-8 min-h-screen md:pl-[25%] md:pr-[25%]">
            <Header/>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">How does it work?</div>
                <div className="pt-5 max-w-xl">
                    Together with a random player, you have to come up with the same word.
                    To do this, you have to get closer word by word.
                </div>
            </div>

            <div className="font-header flex flex-col items-center pt-8">
                <div className="text-white text-3xl">Let's getting started!</div>
                <div className="pt-5">
                    Choose your username and search for a game.
                </div>
                <form className="flex flex-col w-full max-w-2xl pl-16 pr-16 pt-5"
                      onSubmit={(e) => {
                          e.preventDefault();

                          if (!clicked) {
                              searchGame();
                          }
                      }}>
                    <input className="rounded p-2 border border-black" placeholder="e.g., Sammy"
                           onChange={(e) => setUsername(e.target.value)}
                           disabled={clicked}
                           autoFocus
                    />
                    <Button clicked={clicked} text="Search" clickedText="Searching..." clickHandler={searchGame}/>
                </form>
            </div>

            {error !== "" &&
                <div className="flex flex-col items-center pt-2 text-btn-border text-center">
                    {error}
                </div>
            }
        </div>
    )
}
