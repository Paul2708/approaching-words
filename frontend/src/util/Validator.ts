export function validateUsername(username: string): string | undefined {
    if (username.length > 16) {
        return "The username is too long. Only 16 characters are allowed."
    }

    const regex = /^[a-zA-Z0-9_-]+$/
    if (!regex.test(username)) {
        return "The username contains illegal characters. Only alphanumeric characters, -, and _ are allowed."
    }

    return undefined
}

export function validateGuess(word: string): string | undefined {
    if (word.length > 32) {
        return "The word is too long. Only 32 characters are allowed."
    }

    const regex = /^[a-zA-Z-]+$/
    if (!regex.test(word)) {
        return "The word contains illegal characters. Only letters and - are allowed."
    }

    return undefined
}
