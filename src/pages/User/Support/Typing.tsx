//Images
import supportImg from "/support.jpg";

const Typing = () => {
    return (
        <div className="flex items-center gap-x-2 text-[11px] text-neutral-500 md:text-xs text-sm xl:text-sm capitalize">
            <div className="relative mr-2 size-fit">
                <img src={supportImg} alt="Banking Buddy Image" className="rounded-[50%] size-10 md:size-12 xl:size-14"></img>
                <div className="right-1 md:right-2 bottom-0 absolute bg-green-500 rounded-[50%] size-2 md:size-2.5" />
            </div>
            <div className="flex gap-x-1">
                <span className="bg-black rounded-full w-1.5 h-1.5 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="bg-black rounded-full w-1.5 h-1.5 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="bg-black rounded-full w-1.5 h-1.5 animate-bounce"></span>
            </div>
        </div>
    );
}

export default Typing;