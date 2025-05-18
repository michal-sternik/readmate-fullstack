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
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AddCustomBook } from "./components/AddCustomBook/AddCustomBook";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { Register } from "./components/Register/Register";
import { LogIn } from "./components/LogIn/LogIn";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="manageBook" element={<SingleBookDetails />} />
        <Route path="addCustomBook" element={<AddCustomBook />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return (
    <SkeletonTheme baseColor="#BBBBBB" highlightColor="#CCCCCC">
      <Provider store={store}>
        {/* <Toaster position="bottom-left" /> */}
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-left"
          theme="colored"
          autoClose={2000}
        />
      </Provider>
    </SkeletonTheme>
  );
}

export default App;
