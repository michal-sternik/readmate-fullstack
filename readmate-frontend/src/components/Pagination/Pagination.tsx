import React, { useEffect, useState } from "react";
import NavIcon from "../../assets/svg/nav-arrow.svg?react";

type PaginationProps = {
  handlePageChange: (direction: -1 | 1) => void;
  actualPage: number;
  totalPages?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  handlePageChange,
  actualPage,
  totalPages,
}) => {
  console.log(actualPage, totalPages);
  return (
    <div className="flex flex-row grow h-10 items-center justify-center lg:justify-end">
      <NavIcon
        className={`hover:scale-[1.1] h-full cursor-pointer transition duration-200 ${
          actualPage <= 1 ? "opacity-70 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => handlePageChange(-1)}
      />
      <p className="font-extrabold w-10 flex justify-center text-[25px] whitespace-nowrap">
        {totalPages ? actualPage + " / " + totalPages : actualPage}
      </p>
      <NavIcon
        className={`hover:scale-[1.1] h-full rotate-180 cursor-pointer transition duration-200 ${
          actualPage === totalPages
            ? "opacity-70 pointer-events-none"
            : "opacity-100"
        }`}
        onClick={() => handlePageChange(1)}
      />
    </div>
  );
};
