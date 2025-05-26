import { Tooltip, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { formatFullDate } from "../../lib/utils";
import { Book } from "../../types/booktypes";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
interface UserProfileBookProps {
  book: Book;
  deleteBook: (bookId: string) => void;
}
export const UserProfileBook = ({ book, deleteBook }: UserProfileBookProps) => {
  const [deleteClicked, setDeleteClicked] = useState(false);

  //delete animation
  const fadeOut = (cb: () => void) => {
    setDeleteClicked(true);
    setTimeout(() => cb(), 300);
  };
  const handleDelete = () => {
    deleteBook!(book.id);
    setDeleteClicked(false);
  };
  return (
    <div
      key={book.id}
      className={`flex flex-col-reverse lg:flex-row gap-5 w-full p-5 justify-between items-start lg:items-center rounded-4xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.2)] transition-opacity duration-300 ${
        deleteClicked ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-row gap-5 w-full xl:w-1/2">
        <a
          className="flex min-w-20 max-w-3/10 "
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-16 h-24 object-cover  rounded-lg transition duration-300 shadow-md hover:scale-105"
          />
        </a>
        <div className="flex flex-col grow w-full overflow-auto scrollbar-hide justify-around box-border  ">
          <NavLink
            to="/manageBook"
            state={{ book: book }}
            className="max-h-15 cursor-pointer font-medium xl:text:md 2xl:text-lg overflow-auto scrollbar-hide"
          >
            {book.title}
          </NavLink>
          <p className="font-extralight max-w-[300px] text-xs max-h-[100px] overflow-auto custom-scroll">
            {book.authors?.join(", ") || "Unknown Author"}
          </p>
          <p className="font-light text-xs ">
            {book.publishedDate
              ? formatFullDate(book.publishedDate)
              : "Unknown Date"}
          </p>
          <div className="w-full flex flex-row justify-between items-center ">
            <div className="flex w-3/4 items-center">
              <div className=" border border-black rounded-4xl px-2  text-sm max-w-full">
                <div className="overflow-auto scrollbar-hide whitespace-nowrap">
                  <span className="inline-block max-w-[300px]">
                    {book.categories?.join(", ") || "Other"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center lg:justify-end w-full gap-2 text-[#A449FF]">
        <p className="font-extralight ">
          {formatFullDate(book.startDate)} {" - "}{" "}
          {book.endDate ? formatFullDate(book.endDate) : "Still reading"}
        </p>
        <Tooltip title="Delete book">
          <IconButton
            onClick={() => fadeOut(() => handleDelete())}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
