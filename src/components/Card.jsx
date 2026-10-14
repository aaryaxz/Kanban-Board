import { Pen, Trash, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCards } from "../hooks/useCards";
import Star from "./Star";

const Card = ({ card, secondaryColor, index }) => {
    const { deleteCard, updateContent, moveCard } = useCards();
    const inputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (!isEditing) return;
        inputRef.current.focus();
        const end = inputRef.current.value.length;
        inputRef.current.setSelectionRange(end, end);
    }, [isEditing]);
    const editCard = () => {
        setIsEditing(true);
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
    };
    return (
            <div onContextMenu={handleRightClick}
            className="perspective-[1000px]"
            >
                <div
                    style={{ backgroundColor: secondaryColor }}
                    className={` w-47 h-47  group border-2 shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] transition-[transform,shadow] duration-0 [transition-duration:500ms,00ms]
                transform-3d 
                ${isFlipped ? "transform-[rotateY(180deg)]" : ""}`}
                >

                    {/* Front */}
                    <div className="absolute inset-0  flex items-center justify-center backface-hidden">
                        {/* Star */}
                        <div
                            className={`${card.priority > 0 ? "flex" : "hidden"} group-hover:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 -top-3`}
                        >
                            {Array.from({ length: 3 }, (_, index) => {
                                return (
                                    <Star
                                        key={index}
                                        index={index}
                                        val={index + 1}
                                        card={card}
                                        cardId={card.id}
                                        fill={index < card.priority ? "#FF59FF" : "white"}
                                    />
                                );
                            })}
                        </div>

                        {/* Edit Button */}
                        <button
                            type="button"
                            aria-label="Edit task"
                            onClick={editCard}
                            className="absolute right-2 top-2 w-5.5 h-5.5 hidden group-hover:flex items-center justify-center cursor-pointer border bg-white shadow-[1.5px_1.5px_0px_0px_#000] rounded-sm"
                        >
                            <Pen size={12} />
                        </button>

                        {/* Task Content */}
                        <textarea
                            ref={inputRef}
                            readOnly={!isEditing}
                            onDoubleClick={() => setIsEditing(true)}
                            onBlur={() => setIsEditing(false)}
                            onMouseDown={(e) => {
                                if (!isEditing) {
                                    e.preventDefault();
                                }
                            }}
                            aria-label="Task content"
                            onChange={(event) => updateContent(event.target.value, card.id)}
                            value={card.content}
                            className={`w-full h-full pt-6 px-10 pb-16 text-center resize-none outline-none ${isEditing ? "cursor-text" : "cursor-default"} ${isEditing ? "select-none" : "select-auto"}`}
                        />

                        {/* Delete Button */}
                        <button
                            type="button"
                            aria-label="Delete task"
                            onClick={() => deleteCard(card.id)}
                            className="absolute right-[-3px] bottom-[-3px] w-6 h-6 hidden group-hover:flex items-center justify-center bg-[#FF2E43] cursor-pointer border rounded-sm "
                        >
                            <Trash size={15} color="white" />
                        </button>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0  flex flex-col  backface-hidden transform-[rotateY(180deg)]  pt-5 gap-6 ">

                        <div className="flex flex-col gap-8">
                            <h3 className="bg-black text-white rounded-full px-3 text-xs font-[ArchivoBlack-Regular] uppercase w-fit ml-3">Deadline</h3>
                            <div className="flex flex-wrap gap-2 justify-center">
                                <button className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all">Today</button>
                                <button className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all">Tmrw</button>
                                <button className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all">+1 wk</button>
                                <button className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all">📅 Pick</button>
                            </div>
                        </div>
                        <div className="dueDate hidden">
                            <button className="w-5 h-5 bg-red-500 border rounded-full flex items-center justify-center shadow-[1.3px_1px_0px_0px_#000] hover:scale-120 transition-all cursor-pointer">
                                <X size={12} color="white"/>
                            </button>
                            <p className="font-[ArchivoBlack-Regular] uppercase text-3xl">15 oct</p>
                        </div>
                    </div>
                    {/* when i click on buttons then dueDate starts appearing */}
                    {/* clicking on 
                    today - today's date and month 
                    tmrw - tomorrows date and month
                    +1 week - 1 week after the date and month
                    and clicking on pick - opens calender select date and shows the date and month
                    */}
                    {/* button click - function (gives the day and date) - showing that value in dueDate JSX */}


                    <div className={`move-card-btn bg-amber-500 absolute bottom-0 border flex justify-center items-center ${isFlipped ? 'rotate-180' :'rotate-0'}`}>
                        <button
                            onClick={() => moveCard(card.id, index, -1)}
                            className={`border-r left-btn cursor-pointer ${index == 0 ? "hidden" : "block"}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => moveCard(card.id, index, +1)}
                            className={`right-btn cursor-pointer ${index == 2 ? "hidden" : "block"}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

    );
};

export default Card;
