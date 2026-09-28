import { Search } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
const Searchbar = () => {
    const {searchquery, setSearchQuery} = useContext(TaskContext)

    return (
        <div
            className=" px-1.5 cursor-pointer h-fit          
            border-2 border-black  shadow-[5px_5px_0px_0px_#000] transition-all bg-white flex items-center gap-1 pl-3"
        >
            <Search size={20} color="gray" />
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search Your Card..."
                className=" p-2 outline-none font-[Poppins-Medium] text-xl text-gray"
            />
        </div>
    );
};

export default Searchbar;
