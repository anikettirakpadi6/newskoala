import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News key="home" pageSize={7} category="general" />} />
          <Route path="/business" element={<News key="business" pageSize={7} category="business" />} />
          <Route path="/entertainment" element={<News key="entertainment" pageSize={7} category="entertainment" />} />
          <Route path="/health" element={<News key="health" pageSize={7} category="health" />} />
          <Route path="/science" element={<News key="science" pageSize={7} category="science" />} />
          <Route path="/sports" element={<News key="sports" pageSize={7} category="sports" />} />
          <Route path="/technology" element={<News key="technology" pageSize={7} category="technology" />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
}
