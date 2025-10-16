const Typing = ({ fullName }: { fullName: string }) => {
    return (
        <div className="flex items-center gap-x-2 text-[11px] text-neutral-500 md:text-xs text-sm xl:text-sm capitalize">
            <div className="flex gap-x-1">
                <span className="bg-black rounded-full w-1.5 h-1.5 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="bg-black rounded-full w-1.5 h-1.5 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="bg-black rounded-full w-1.5 h-1.5 animate-bounce"></span>
            </div>
            <span>{`${fullName} is typing...`}</span>
        </div>
    );
}

export default Typing;