import { Pen, Trash, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCards } from "../hooks/useCards";
import Star from "./Star";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Card = ({ card, secondaryColor, index }) => {
    const { deleteCard, updateContent, updateDueDate, moveCard } = useCards();

    const inputRef = useRef(null);
    const pickerRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [showpicker, setShowpicker] = useState(false);

    const today = new Date();
    const curr_date = today.getDate();
    const tmrw_date = curr_date + 1;
    const oneweek = curr_date + 7;
    const month = today.toLocaleDateString("en-US", { month: "short" });

    useEffect(() => {
        if (!isEditing) return;
        inputRef.current.focus();
        const end = inputRef.current.value.length;
        inputRef.current.setSelectionRange(end, end);
    }, [isEditing]);

    useEffect(() => {
        if (!showpicker) return;
        const handlePointerDown = (event) => {
            if (pickerRef.current?.contains(event.target)) return;

            setShowpicker(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [showpicker]);


    const handleRightClick = (e) => {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
    };

    return (
        <div className="relative ">
            <div
                onContextMenu={handleRightClick}
                style={{ backgroundColor: secondaryColor }}
                className={` w-47 h-47  group border-2 shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] transition-[transform,shadow] duration-0 [transition-duration:500ms,00ms]
                transform-3d  relative z-50
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
                        onClick={()=>setIsEditing(true)}
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
                <div
                    className={`absolute ${showpicker ? "z-50" : "z-0"} inset-0  flex flex-col  backface-hidden transform-[rotateY(180deg)]  pt-5 gap-6`}
                >
                    <div
                        className={`deadline  flex flex-col gap-8 ${isBtnClicked ? "hidden" : "flex"}`}
                    >
                        <h3 className="bg-black text-white rounded-full px-3 text-xs font-[ArchivoBlack-Regular] uppercase w-fit ml-3">
                            Deadline
                        </h3>
                        <div className="dueDateOptions flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => {
                                    setIsBtnClicked(true);
                                    updateDueDate(curr_date, month, card.id);
                                }}
                                className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all"
                            >
                                Today
                            </button>
                            <button
                                onClick={() => {
                                    setIsBtnClicked(true);
                                    updateDueDate(tmrw_date, month, card.id);
                                }}
                                className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all"
                            >
                                Tmrw
                            </button>
                            <button
                                onClick={() => {
                                    setIsBtnClicked(true);
                                    updateDueDate(oneweek, month, card.id);
                                }}
                                className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all"
                            >
                                +1 wk
                            </button>
                            <button
                                onClick={() => {
                                    setShowpicker(true);
                                }}
                                className="border bg-white text-black font-[ArchivoBlack-Regular] shadow-[1.5px_1.5px_0px_0px_#000] hover:-translate-y-0.3 hover:-translate-x-0.5 hover:shadow-[2.3px_2.3px_0_#000] hover:bg-[#FF59FF] rounded-sm px-2 py-1 uppercase text-xs cursor-pointer transition-all"
                            >
                                📅 Pick
                            </button>
                        </div>
                        {/* Clicking on each button updateDuedate runs with parameter curr_date, tmrw_date, oneweek_date and so on*/}
                    </div>

                    <div
                        className={`dueDate ${!isBtnClicked ? "hidden" : "flex"}  relative h-full`}
                    >
                        <button
                            onClick={() => setIsBtnClicked(false)}
                            className="w-5 h-5 bg-red-500 border rounded-full flex items-center justify-center shadow-[1.3px_1px_0px_0px_#000] hover:scale-120 transition-all cursor-pointer absolute right-5 "
                        >
                            <X size={12} color="white" />
                        </button>
                        <div className="w-full h-full flex items-center justify-center ">
                            <p
                                onClick={() => setShowpicker(true)}
                                className=" font-[ArchivoBlack-Regular] uppercase text-3xl cursor-pointer"
                            >
                                {card.dueDate}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className={`move-card-btn bg-amber-500 z-20 absolute bottom-0 border flex justify-center items-center ${isFlipped ? "rotate-180" : "rotate-0"}`}
                >
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
            {showpicker && (
                <div
                    ref={pickerRef}
                    onContextMenu={(e) => e.preventDefault()}
                    className="mt-3 absolute z-100 left-20 top-3 "
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            onChange={(newValue) => {
                                if (newValue) {
                                    updateDueDate(newValue.date(), newValue.format("MMM"),card.id);
                                    setIsBtnClicked(true);
                                    setShowpicker(false);
                                }
                            }}
                            onAccept={() => setShowpicker(false)}
                            onClose={() => setShowpicker(false)}
                            slotProps={{
                                actionBar: {
                                    actions: ["cancel", "accept"],
                                },
                            }}
                            sx={{
                                width: "fit-content",
                                minWidth: 0,
                                border: "1px solid black",
                                borderRadius: "0px",
                                overflow: "hidden",

                                // Hide the large top heading
                                "& .MuiPickersToolbar-root": {
                                    display: "none",
                                },

                                // Reduce the calendar container size
                                "& .MuiDateCalendar-root": {
                                    width: "260px",
                                    height: "270px",
                                    maxHeight: "270px",
                                },

                                // Reduce the height of the date grid
                                "& .MuiDayCalendar-monthContainer": {
                                    position: "relative",
                                },

                                // Smaller date buttons
                                "& .MuiPickersDay-root": {
                                    width: "30px",
                                    height: "30px",
                                    fontSize: "12px",
                                    margin: "0 2px",
                                },

                                // Compact weekday headings
                                "& .MuiDayCalendar-weekDayLabel": {
                                    width: "30px",
                                    height: "30px",
                                    margin: "0 2px",
                                    fontSize: "11px",
                                },

                                // Compact month/year header
                                "& .MuiPickersCalendarHeader-root": {
                                    minHeight: "42px",
                                    marginTop: "4px",
                                    marginBottom: "4px",
                                    paddingLeft: "12px",
                                    paddingRight: "8px",
                                },

                                // Reduce space below calendar
                                "& .MuiPickersLayout-contentWrapper": {
                                    padding: 0,
                                },

                                // Compact action buttons
                                "& .MuiDialogActions-root": {
                                    padding: "4px 8px",
                                },
                            }}
                        />
                    </LocalizationProvider>
                </div>
            )}
        </div>
    );
};

export default Card;
