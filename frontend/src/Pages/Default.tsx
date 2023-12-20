import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import  Home  from './Home'
import Footer from '../Components/Footer'
import Cart from './Cart'

 const Default: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div>
        <Home handleClickOpen={handleClickOpen}/>
        <Cart open={open} handleClose={handleClose} />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Default
