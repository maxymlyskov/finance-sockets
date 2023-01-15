import React from "react";
import { Route, Routes } from "react-router-dom/dist";

import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import TickerDetailsPage from "./pages/TickerDetailsPage";
function App() {
  return (
    <main data-testid="app">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<TickerDetailsPage />} />
      </Routes>
    </main>
  );
}

export default App;
