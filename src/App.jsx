import React from "react";
import Headers from "./components/headers/Headers";
import Pages from "./components/mainpages/Pages";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Headers />
          <Pages />
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
