"use client";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer flex items-center bg-white">
            <input 
                type="text" 
                placeholder="Keyword" 
                className="text-sm font-semibold px-6 flex-1 outline-none"
            />
            <div className="text-sm font-semibold px-6 border-x-[1px]">
                Binh Thanh
            </div>
            <div className="text-sm font-semibold px-6 border-x-[1px]">
                Select Radius
            </div>
            <div className="bg-rose-500 text-white p-2 rounded-full">
                <BiSearch size={18} />
            </div>
        </div>
    );
}

export default Search;
