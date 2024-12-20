export interface ButtonProps {
    clicked?: boolean;
    text: string
    clickedText?: string;
    clickHandler: () => void;
}


export default function Button(props: ButtonProps) {
    if (props.clicked) {
        return (
            <button
                className="bg-btn-active border-btn-border-active text-white rounded-2xl border-4 w-full mt-5 p-1"
            >{props.clickedText}
            </button>
        )
    } else {
        return (
            <button
                className="bg-btn border-btn-border text-white rounded-2xl border-4 w-full mt-5 p-1"
                onClick={props.clickHandler}
            >{props.text}
            </button>
        )
    }
}
