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

export const SingleBookDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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
  } = state.book;

  const [dateFrom, setDateFrom] = useState<Dayjs | null>(
    startDate ? dayjs(startDate) : null
  );

  //remember to convert Date to dayjs object
  const [dateTo, setDateTo] = useState<Dayjs | null>(
    endDate ? dayjs(endDate) : null
  );

  //it'll be true if the user is currently reading the book, so only dateTo mattern
  const [currentlyReading, setCurrentlyReading] = useState<boolean>(!dateTo);

  if (!state?.book) {
    return <div>No book data available.</div>;
  }

  console.log(dateFrom, endDate);
  return (
    <>
      <div className="flex flex-col-reverse xl:flex-row h-full min-h-145 lg:min-h-auto w-full gap-10 lg:gap-5">
        <div className="flex flex-col w-full h-full xl:w-2/3 gap-3 xl:gap-5 justify-between overflow-auto custom-scroll">
          <div className="flex flex-col w-full h-full gap-3">
            <div className="text-2xl text-[#A449FF] font-extrabold">
              {title}
            </div>
            <div className="text-md text-[#A449FF] ">
              {authors?.join(", ") ?? "Unknown Author"}
            </div>
            <div className="flex xl:hidden flex-wrap flex-row gap-2 items-center justify-start ">
              <CustomChip
                icon={<AutoStoriesIcon />}
                label={`Pages: ${pageCount ? pageCount : "Pages Unknown"}`}
              />
              <CustomChip
                icon={<EventNoteIcon />}
                label={`${publishedDate ? publishedDate : "Date unknown"}`}
              />
              <CustomChip
                icon={<CategoryIcon />}
                label={`${categories.join(",")}`}
              />
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
                  onChange={(newValue) => setDateFrom(newValue)}
                  slotProps={{
                    field: { clearable: true },
                  }}
                  className="w-full"
                  disableFuture
                />
                <DatePicker
                  label="End date"
                  value={dateTo}
                  onChange={(newValue) => setDateTo(newValue)}
                  slotProps={{
                    field: { clearable: true },
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
            <Button className=" w-1/2 ">
              {startDate ? "EDIT" : "ADD BOOK"}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-5 flex-row-reverse xl:flex-col xl:grow lg:justify-end xl:justify-between max-h-40 xl:max-h-full">
          <div className="flex flex-col gap-2 xl:gap-5 w-full h-full xl:h-auto">
            <div className="flex w-full">
              <a href={link} className="w-full">
                <CustomChip
                  icon={<OpenInNewIcon />}
                  label={`Open in browser`}
                  className="w-full"
                />
              </a>
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
                label={`${publishedDate ? publishedDate : "Date unknown"}`}
              />
              <CustomChip
                icon={<CategoryIcon />}
                label={`${categories.join(",")}`}
              />
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
