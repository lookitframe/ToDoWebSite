import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Reg";
import Auto from "./Pages/Auto";
import Parse from "parse";
Parse.initialize("8554rugChtH85gFISYVvuoaC9srwcaGnFyplAnB2", "UlNhYvHvrdrsRL65TBmtkxEvw1OghARnP5e3s5uO");
Parse.serverURL = "https://parseapi.back4app.com/";

const App = () => {
  return (
    <Router>
    

      <Routes>
        <Route path="/" element={<Auto />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
