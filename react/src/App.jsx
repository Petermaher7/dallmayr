import React from 'react';
import Navbar from "./Component/Navbar";
import Admin from "./Component/Admin";
import Cart from './Component/Cart';
import CartDetails from "./Component/CartDetails"
import { createBrowserRouter , RouterProvider } from "react-router-dom";

function App() {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/CartDetails/:name",
      element: <CartDetails />
    },
  ])
  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>

  )
}

export default App
