import React from 'react';
// import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Aboutus from "./Aboutus";
import Services from "./Services";
import Products from "./Products";

// const AppRoutes = () => {
//   <Routes>
//   <Route path='/' element={<Home/>} />
//   <Route path='/aboutus' element={<Aboutus />} />
//   <Route path='/services' element={<Services/>} />
//   <Route path='/products' element={<Products/>} />
// </Routes>
// }

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/aboutus',
    element: <Aboutus />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/products',
    element: <Products />
  },

];

export default AppRoutes;
