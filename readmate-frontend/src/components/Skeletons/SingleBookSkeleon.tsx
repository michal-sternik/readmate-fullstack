import Skeleton from "react-loading-skeleton";

export const SingleBookSkeleton = () => {
  return (
    <div className="w-full xl:w-3/10 h-3/10 gap-3 flex flex-row p-5">
      <div className=" w-1/3 h-auto">
        <Skeleton className="h-full w-full" />
      </div>

      <div className=" flex-1  flex flex-col p-1 gap-3 justify-between">
        <Skeleton className=" text-3xl" />
        <Skeleton className=" text-3xl" />
        <Skeleton className=" text-3xl" />
      </div>
    </div>
  );
};
{
}
