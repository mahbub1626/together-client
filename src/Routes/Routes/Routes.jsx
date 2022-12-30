import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import About from "../../Pages/About/About";
import Friends from "../../Pages/Friends/Friends";
import LogIn from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/LogIn/SignUp";
import Media from "../../Pages/Media/Media";
import Peoples from "../../Pages/Peoples/Peoples";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <></>,
    children: [
      {
        path: '/',
        element: <Media></Media>
      },
      {
        path: '/login',
        element: <LogIn></LogIn>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/friends',
        element: <Friends></Friends>
      },
      {
        path: '/peoplenearby',
        element: <Peoples></Peoples>
      },
      {
        path: '/about',
        element: <About></About>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <></>,
    errorElement: <></>,
    children: [
      {
        path: '/dashboard',
        element: <></>
      }
    ]
  }
])

export default router;