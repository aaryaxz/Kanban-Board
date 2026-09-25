import { useContext } from "react";
import { useCards } from "../hooks/useCards";
import Card from "./Card";
import { TaskContext } from "../context/TaskContext";

const Column = ({ column, index, columns }) => {
    const secondaryColor = column?.secondaryBg;
    const accentColor = column?.accentBg;
    const { addCard } = useCards();
    const { data } = useContext(TaskContext);

    let curr_cards = data.filter((card) => card.columnId === column.id);

    return (
        <div className="relative w-full sm:w-80 md:w-153 shrink-0 flex flex-col min-h-screen border-r border-black/10 bg-[#ededed]/60 font-poppins overflow-hidden">
            {/* Column Content — blurs when modal is open */}
            <div
                className={`flex flex-col flex-1 px-12 py-6 transition-all duration-300 `}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-fit py-3 ">
                    <div className="flex items-center gap-5">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-black font-[ArchivoBlack-Regular]">
                            {column?.title}
                        </h2>
                        <span
                            style={{ backgroundColor: accentColor }}
                            className="w-9 h-9 flex items-center justify-center text-sm font-bold border border-black  rounded-full font-[Poppins-Light] shadow-[1px_1.5px_0px_0px_#000]"
                        >
                            {curr_cards.length}
                        </span>
                    </div>
                    <button
                        style={{ "--accent-color": accentColor }}
                        className="text-2xl  font-light text-black px-1.5 cursor-pointer font-[Poppins-Light] h-8 hover:bg-(--accent-color)
                        
                        border-2 border-black  shadow-[3px_3px_0px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all
                        
                        "
                        onClick={() => addCard(column?.id)}
                    >
                        +
                    </button>
                </div>

                {/* Content Area */}
                <div className={`flex-1 flex flex-col items-center py-10`}>
                    <div className="hidden flex-col items-center gap-4">
                        <p className="text-gray-800 text-[1.4rem] font-medium font-[Poppins-Regular]">
                            No Tasks Yet!
                        </p>
                        <button
                            style={{ backgroundColor: accentColor }}
                            className="px-6 py-2.5 text-[1.7rem] font-black tracking-wider uppercase border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all cursor-pointer font-[Poppins-Light]"
                        >
                            <span>+</span> ADD TASK
                        </button>
                    </div>
                    <div className=" min-h-fit w-full flex flex-wrap gap-20">
                        {curr_cards.map((card) => {
                            return (
                                <Card
                                    key={card.id}
                                    column={column}
                                    card={card}
                                    secondaryColor={secondaryColor}
                                    index={index}
                                    columns={columns}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Column;
