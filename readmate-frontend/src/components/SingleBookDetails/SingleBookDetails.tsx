import { Button } from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { CustomChip } from "../CustomChip/CustomChip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Checkbox } from "@mui/material";
import { Book } from "../../types/booktypes";
import { BookService } from "../../api/services/bookService";
import {
  convertAndDisplayError,
  formatFullDate,
  validateEndDate,
  validateStartDate,
} from "../../lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { mutate } from "swr";

export const SingleBookDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [book, setBook] = useState<Book>(state.book as Book);
  const {
    title,
    authors,
    publishedDate,
    link,
    categories,
    pageCount,
    description,
    imageLink,
    startDate,
    endDate,
  } = book as Book;

  const [dateFrom, setDateFrom] = useState<Dayjs | null>(
    startDate ? dayjs(startDate) : null
  );

  //remember to convert Date to dayjs object
  const [dateTo, setDateTo] = useState<Dayjs | null>(
    endDate ? dayjs(endDate) : null
  );
  const [dateFromError, setDateFromError] = useState<string | null>(null);
  const [dateToError, setDateToError] = useState<string | null>(null);

  //it'll be true if the user is currently reading the book, so only dateTo mattern
  const [currentlyReading, setCurrentlyReading] = useState<boolean>(!dateTo);
  const user = useSelector((state: RootState) => state.user.user);

  const authorDisplay = authors?.length ? authors.join(", ") : "Unknown Author";
  const categoryDisplay =
    categories && categories.length > 0 ? categories.join(", ") : "Other";

  if (!state?.book) {
    return <div>No book data available.</div>;
  }

  const validateForm = () => {
    let valid = true;
    if (!dateFrom) {
      setDateFromError("Start date cannot be empty.");
      valid = false;
    }
    if (dateTo && dateFrom && dayjs(dateTo).isBefore(dayjs(dateFrom))) {
      setDateToError("End date cannot be earlier than start date.");
      valid = false;
    }
    return valid;
  };

  const handleAddBook = async () => {
    const bookToAdd = {
      ...state.book,
      startDate: dayjs(dateFrom).format("YYYY-MM-DD"),
      endDate:
        !currentlyReading && dateTo ? dayjs(dateTo).format("YYYY-MM-DD") : null,
    };
    setBook((prev) => ({
      ...prev,
      startDate: dateFrom!.toDate(),
      endDate: !currentlyReading && dateTo ? dateTo.toDate() : prev.endDate,
    }));
    try {
      await BookService.addBook(bookToAdd);
      mutate(
        (key) => typeof key === "string" && key.startsWith("/book/calendar")
      );
      toast.success("Book added successfully!");
    } catch (error) {
      convertAndDisplayError(error);
    }
  };

  const handleEditBook = async () => {
    const bookToEdit = {
      startDate: dayjs(dateFrom).format("YYYY-MM-DD"),
      endDate:
        !currentlyReading && dateTo ? dayjs(dateTo).format("YYYY-MM-DD") : null,
    };

    try {
      await BookService.editBook(state.book.id, bookToEdit);
      mutate(
        (key) => typeof key === "string" && key.startsWith("/book/calendar")
      );
      toast.success("Book edited successfully!");
    } catch (error) {
      convertAndDisplayError(error);
    }
  };

  const handleDateFromChange = (newValue: Dayjs | null) => {
    if (!newValue || !newValue.isValid()) {
      setDateFromError("Invalid date. Please enter a valid date.");
      setDateFrom(null);
      return;
    }
    setDateFrom(newValue);

    setDateFromError(validateStartDate(newValue));
    setDateToError(validateEndDate(dateTo, newValue));
  };

  const handleDateToChange = (newValue: Dayjs | null) => {
    if (!newValue || !newValue.isValid()) {
      setDateToError("Invalid date. Please enter a valid date.");
      setDateTo(null);
      return;
    }
    setDateTo(newValue);

    setDateFromError(validateStartDate(dateFrom));
    setDateToError(validateEndDate(newValue, dateFrom));
  };
  return (
    <>
      <div className="flex flex-col-reverse  xl:flex-row h-full min-h-130 w-full gap-10 lg:gap-5">
        <div className="flex flex-col w-full h-full xl:w-2/3 gap-3 xl:gap-5 justify-between ">
          <div className="flex flex-col w-full h-full gap-3">
            <div className="text-2xl text-[#A449FF] font-extrabold">
              {title}
            </div>
            <div className="text-md text-[#A449FF] ">{authorDisplay}</div>
            <div className="flex xl:hidden flex-wrap flex-row gap-2 items-center justify-start ">
              <CustomChip
                icon={<AutoStoriesIcon />}
                label={`Pages: ${pageCount ? pageCount : "Pages Unknown"}`}
              />
              <CustomChip
                icon={<EventNoteIcon />}
                label={
                  publishedDate instanceof Date
                    ? formatFullDate(publishedDate)
                    : publishedDate
                    ? publishedDate
                    : "Date unknown"
                }
              />
              <CustomChip icon={<CategoryIcon />} label={categoryDisplay} />
            </div>
            <div className="hidden xl:inline text-xl text-[#A449FF]">
              Description:
            </div>
            <div className="text-sm hidden xl:inline max-h-20 overflow-auto custom-scroll">
              {description ? description : "No description available."}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="text-xl text-[#A449FF] font-bold">
                Fill in the dates:
              </div>
              <div className="flex flex-row xl:flex-col gap-2 w-full">
                <DatePicker
                  label="Start date"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                  slotProps={{
                    field: { clearable: true },
                    textField: {
                      required: true,
                      error: !!dateFromError,
                      helperText: dateFromError,
                    },
                  }}
                  className="w-full"
                  disableFuture
                />
                <DatePicker
                  label="End date"
                  value={dateTo}
                  onChange={handleDateToChange}
                  slotProps={{
                    field: { clearable: true },
                    textField: {
                      error: !!dateToError,
                      helperText: dateToError,
                    },
                  }}
                  disabled={currentlyReading}
                  className="w-full"
                  disableFuture
                />
              </div>
              <div>
                <Checkbox
                  checked={currentlyReading}
                  onChange={() => {
                    setCurrentlyReading(!currentlyReading);
                    setDateTo(null);
                  }}
                ></Checkbox>
                <span className="text-sm text-[#A449FF] font-bold">
                  Currently Reading
                </span>
              </div>
            </LocalizationProvider>
          </div>

          <div className="flex flex-row gap-2 mb-5 ">
            <Button onClick={() => navigate(-1)} className=" w-1/2 ">
              BACK
            </Button>
            <Button
              className="w-1/2"
              onClick={() => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                if (!validateForm() || dateFromError || dateToError) {
                  return;
                }
                if (!startDate) {
                  handleAddBook();
                } else {
                  handleEditBook();
                }
              }}
            >
              {!user ? "LOG IN TO ADD" : startDate ? "EDIT" : "ADD BOOK"}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-5 flex-row-reverse xl:flex-col xl:grow lg:justify-end xl:justify-between max-h-40 xl:max-h-full">
          <div className="flex flex-col gap-2 xl:gap-5 w-full h-full xl:h-auto">
            <div className="flex w-full">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <CustomChip
                    icon={<OpenInNewIcon />}
                    label="Open in browser"
                    className="w-full"
                  />
                </a>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed opacity-50"
                >
                  <CustomChip
                    icon={<OpenInNewIcon />}
                    label="Open in browser"
                    className="w-full"
                  />
                </button>
              )}
            </div>
            <div className="xl:hidden text-2xl text-[#A449FF]">
              Description:
            </div>
            <div className="xl:hidden text-sm max-h-20 overflow-auto custom-scroll">
              {description ? description : "No description available."}
            </div>

            <div className=" flex-wrap hidden xl:flex flex-row gap-2 items-center justify-start ">
              <CustomChip
                icon={<AutoStoriesIcon />}
                label={`Pages: ${pageCount ? pageCount : "Pages Unknown"}`}
              />
              <CustomChip
                icon={<EventNoteIcon />}
                label={
                  publishedDate instanceof Date
                    ? formatFullDate(publishedDate)
                    : publishedDate
                    ? publishedDate
                    : "Date unknown"
                }
              />
              <CustomChip icon={<CategoryIcon />} label={categoryDisplay} />
            </div>
          </div>

          <img
            src={imageLink}
            alt={title}
            className="max-h-full max-w-full h-full object-contain "
          />
        </div>
      </div>
    </>
  );
};
