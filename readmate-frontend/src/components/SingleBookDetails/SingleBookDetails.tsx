import { useLocation } from "react-router-dom";

export const SingleBookDetails = () => {
  const { state } = useLocation();

  return <div>{state.book.volumeInfo.title}</div>;
};
