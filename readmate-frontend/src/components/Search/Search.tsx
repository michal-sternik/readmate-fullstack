import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import DoneIcon from "@mui/icons-material/Done";
import { useDebounce } from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeSearchPhrase, restrictLanguage } from "../../redux/exploreSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery);
  const languageTogglerChecked = useSelector(
    (state: RootState) => state.searchInput.langRestrict
  );
  const [showInputOptions, setShowInputOptions] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputOptionsVisibility = () => {
    setShowInputOptions(true);
    navigate("explore");
  };
  useEffect(() => {
    dispatch(changeSearchPhrase({ searchPhrase: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="flex w-full flex-row justify-around items-center grow">
      <div className="flex flex-col justify-center items-center h-full w-full">
        {/* input */}
        <div
          className={`w-full h-10 flex items-center rounded-4xl ${
            showInputOptions ? "rounded-b-none" : "rounded-4xl"
          } bg-white/50  shadow-[0_4px_24px_-6px_rgba(0,0,0,0.75)] transition duration-150`}
        >
          <input
            onChange={handleChange}
            onClick={handleInputOptionsVisibility}
            type="text"
            placeholder="Click and start typing ..."
            value={searchQuery}
            className="w-full h-full ml-[5%] mr-[5%] text-[20px] font-bold border-none outline-none bg-transparent caret-pink-400 bg-gradient-to-r from-[#6100c3] via-[#f91af9] to-[#6100c3] bg-clip-text text-transparent bg-[length:50%]"
          />
        </div>

        {/*input options */}
        <div
          className={`w-full h-10 flex items-center justify-start transition-all duration-300 font-semibold 
            ${
              showInputOptions
                ? "opacity-100 shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)]"
                : "opacity-0 pointer-events-none"
            } 
            rounded-b-4xl bg-white/50 `}
        >
          <button
            onClick={() =>
              dispatch(
                restrictLanguage({ langRestrict: !languageTogglerChecked })
              )
            }
            className={`transition-all duration-300 cursor-pointer h-7/10 w-auto px-5 gap-2 flex flex-row justify-evenly items-center ml-[4%] ${
              languageTogglerChecked ? "bg-purple-500/50" : "bg-white/50"
            } opacity-90 border border-[#ABABAB] rounded-4xl`}
          >
            <div>only in</div>
            <Flag
              code="pl"
              className="rounded-[8px] h-8/10 "
              style={{
                filter: "drop-shadow(0px 0px 3px #000000)",
              }}
            />
            <div
              className={`transition-all duration-300 ${
                languageTogglerChecked ? "opacity-100 w-auto" : "opacity-0 w-0"
              } overflow-hidden flex items-center`}
            >
              <DoneIcon />
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative  group"
              tabIndex={0}
            >
              <div className="w-[16px] h-[16px] bg-gray-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold cursor-pointer">
                i
              </div>

              <div
                className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 
                  bg-black text-white text-xs px-2 py-1 rounded-md shadow-md 
                  whitespace-nowrap opacity-0 pointer-events-none 
                  group-hover:opacity-100 group-focus:opacity-100 
                  group-hover:pointer-events-auto group-focus:pointer-events-auto 
                  transition duration-200"
              >
                Language content may not be accurate
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
