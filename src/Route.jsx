/** @format */

// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
const Home = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
