import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Friends from "../../Pages/Friends/Friends";
import LogIn from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/LogIn/SignUp";
import Media from "../../Pages/Media/Media";

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
      }
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