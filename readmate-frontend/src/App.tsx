import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// import { Home } from "./components/Home/Home";
// import { Sidebar } from "./components/Sidebar/Sidebar";
// import Explore from "./components/Explore/Explore";
import { RootLayout } from "./components/RootLayout/RootLayout";
import Home from "./components/Home/Home";
import { Calendar } from "./components/Calendar/Calendar";
import { Explore } from "./components/Explore/Explore";
import { SingleBookDetails } from "./components/SingleBookDetails/SingleBookDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="addBook" element={<SingleBookDetails />} />
        {/* <Route path="sign-in" element={<SignIn />} />
        <Route path="log-in" element={<LogIn />} /> */}
        <Route path="calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return (
    // <SkeletonTheme baseColor="#BBBBBB" highlightColor="#CCCCCC">
    //   <Toaster position="bottom-left" />
    <RouterProvider router={router} />
    // </SkeletonTheme>
  );
}

export default App;
