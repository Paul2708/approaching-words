import {WordPair} from "../components/WordList.tsx";

export function addHiddenWordFromOpponent(wordPairs: WordPair[]): WordPair[] {
    if (wordPairs.length === 0) {
        return [{
            word: {
                text: "",
                hidden: false
            },
            teamMateWord: {
                text: "abcdefghi",
                hidden: true
            },
        }]
    }

    if (wordPairs[wordPairs.length - 1].word.text !== "" && wordPairs[wordPairs.length - 1].teamMateWord.text !== "") {
        return [
            ...wordPairs,
            {
                word: {
                    text: "",
                    hidden: false
                },
                teamMateWord: {
                    text: "rgeerg123",
                    hidden: true
                }
            }
        ]
    } else {
        const latestIndex = wordPairs.length - 1;
        const updatedWordPairs = [...wordPairs];
        updatedWordPairs[latestIndex] = {
            ...wordPairs[latestIndex],
            teamMateWord: {
                text: "aBcDeFgH",
                hidden: true
            }
        };

        return updatedWordPairs;
    }
}


export function revealWord(wordPairs: WordPair[], word: string): WordPair[] {
    const latestIndex = wordPairs.length - 1;
    const updatedWordPairs = [...wordPairs];
    updatedWordPairs[latestIndex] = {
        ...wordPairs[latestIndex],
        teamMateWord: {
            text: word,
            hidden: false
        }
    };

    return updatedWordPairs
}

export function addGuessedWord(wordPairs: WordPair[], word: string): WordPair[] {
    if (wordPairs.length === 0) {
        return [...wordPairs, {
            word: {
                text: word,
                hidden: false
            },
            teamMateWord: {
                text: "",
                hidden: false
            }
        }]
    }

    if (wordPairs[wordPairs.length - 1].word.text !== "" && wordPairs[wordPairs.length - 1].teamMateWord.text !== "") {
        return [...wordPairs, {
            word: {
                text: word,
                hidden: false
            },
            teamMateWord: {
                text: "",
                hidden: false
            }
        }]
    } else {
        const latestIndex = wordPairs.length - 1;
        const updatedWordPairs = [...wordPairs];
        updatedWordPairs[latestIndex] = {
            ...wordPairs[latestIndex],
            word: {
                text: word,
                hidden: false
            }
        };

        return updatedWordPairs;
    }
}
