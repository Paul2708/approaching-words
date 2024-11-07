export interface Word {
    text: string;
    hidden: boolean;
}

export interface WordPair {
    word: Word;
    teamMateWord: Word;
}

export interface WordListProps {
    title: string;
    teamMate: string;
    wordPairs: WordPair[];
}

export default function WordList(props: WordListProps) {
    return (
        <div className="font-header flex flex-col items-center pt-8">
            <div className="text-white text-3xl">{props.title}</div>
            <div className="w-full max-w-4xl pt-2">
                <div className="flex flex-row w-full">
                    <div className="w-1/2 text-center underline">You</div>
                    <div className="w-1/2 text-center">{props.teamMate}</div>
                </div>
            </div>
            <div className="w-full max-w-4xl bg-[#CA7C7C] text-white shadow-lg rounded min-h-8">
                <div className="flex flex-col w-full">
                    {props.wordPairs.slice()
                        .reverse()
                        .map((wordPair, index) => (
                            <div key={index} className="flex w-full">
                                <div className="w-1/2 p-2 text-center">{wordPair.word.text}</div>
                                <div
                                    className={`w-1/2 p-2 text-center ${wordPair.teamMateWord.hidden ? "blur-sm" : ""}`}>
                                    {wordPair.teamMateWord.text}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
