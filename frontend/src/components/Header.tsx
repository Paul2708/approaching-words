export default function Header() {
    return (
        <div className="font-title uppercase text-4xl flex flex-col text-white lg:justify-items-center">
            <div
                className="self-start lg:self-center lg:pr-80 drop-shadow-[5px_5px_5px_rgba(0,0,0,1)] animate-move-left-to-right">Approaching
            </div>
            <div className="self-end lg:self-center lg:pl-80 drop-shadow-[5px_5px_5px_rgba(0,0,0,1)] animate-move-right-to-left">Words</div>
        </div>
    )
}
