import React, { useEffect, useState } from "react";
import NavIcon from "../../assets/svg/nav-arrow.svg?react";

type PaginationProps = {
  handlePageChange: (direction: number) => void;
  actualPage: number;
  totalPages?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  handlePageChange,
  actualPage,
  totalPages,
}) => {
  const [disablePrevButton, setDisablePrevButton] = useState(true);

  useEffect(() => {
    setDisablePrevButton(actualPage <= 1);
  }, [actualPage]);

  return (
    <div className="flex flex-row grow h-10 items-center justify-center lg:justify-end">
      <NavIcon
        className={`hover:scale-[1.1] h-full cursor-pointer transition duration-200 ${
          disablePrevButton ? "opacity-70 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => handlePageChange(-1)}
      />
      <p className="font-extrabold w-10 flex justify-center text-[25px] whitespace-nowrap">
        {totalPages ? actualPage + " / " + totalPages : actualPage}
      </p>
      <NavIcon
        className="hover:scale-[1.1] h-full rotate-180 cursor-pointer transition duration-200"
        onClick={() => handlePageChange(1)}
      />
    </div>
  );
};
