import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import NotFound from './Pages/NotFound'
import Products from './Pages/Products'
import SingleProduct from './Pages/SingleProduct'
import Default from './Pages/Default'
import Hero from './Pages/Hero'
import Cart from './Pages/Cart'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Default />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Hero />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: "products/:id",
          element: <SingleProduct />
        },
        {
          path: 'cart',
          element:<Cart open = {false} handleClose={function (): void {
            throw new Error('Function not implemented.');
          }}/>
        },
      ]
    },
    {
      path: 'cart',
      //element: <Cart/>
    },

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
