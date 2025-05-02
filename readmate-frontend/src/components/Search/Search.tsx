import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
// import MUIToggler from "../MUIToggler/MUIToggler"
// import { AuthContext } from "../../context/AuthProvider"
// import { ReactComponent as Icon } from '../../static/svg/logout.svg'

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [startIndex, setStartIndex] = useState(0);
  // const [togglerChecked, setTogglerChecked] = useState(false);
  const [showInputOptions, setShowInputOptions] = useState(false);

  const navigate = useNavigate();

  // const handleLogout = async () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // const handleTogglerChange = () => {
  //   setTogglerChecked(!togglerChecked);
  // };

  const handleInputOptionsVisibility = () => {
    setShowInputOptions(true);
    navigate("explore");
  };

  // const resetToggler = () => setTogglerChecked(false);

  //   useEffect(() => {
  //     setStartIndex(actualPage * 9 - 9)
  //     if (togglerChecked) {
  //       axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=9&startIndex=${startIndex}&langRestrict=pl`)
  //         .then(data => setBookList(data.data.items))
  //     } else {
  //       axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=9&startIndex=${startIndex}`)
  //         .then(data => setBookList(data.data.items))
  //     }
  //   }, [actualPage, togglerChecked])

  //   useEffect(() => {
  //     resetToggler()
  //     setIsTyping(true)
  //     const timer = setTimeout(() => {
  //       axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=9&startIndex=${startIndex}`)
  //         .then(data => setBookList(data.data.items))
  //       setIsTyping(false)
  //     }, 400)

  //     return () => clearTimeout(timer)
  //   }, [searchQuery])
  // const typing = searchQuery.length > 0;
  return (
    <div className="flex w-full flex-row justify-around items-center grow">
      <div className="flex flex-col justify-center items-center h-full w-full">
        {/* Input */}
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

        {/* Input Options */}
        <div
          className={`w-full h-10 flex items-center justify-start transition-all duration-300 font-semibold 
            ${
              showInputOptions
                ? "opacity-100 shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)]"
                : "opacity-0 pointer-events-none"
            } 
            rounded-b-4xl bg-white/50 `}
        >
          <div className="h-7/10 w-auto px-5 gap-2 flex flex-row justify-evenly items-center ml-[4%] bg-white opacity-90 border border-[#ABABAB] rounded-4xl">
            <div>only in</div>
            <Flag
              code="pl"
              className="rounded-[8px] h-8/10 "
              style={{
                filter: "drop-shadow(0px 0px 3px #000000)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
