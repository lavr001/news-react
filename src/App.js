import React from "react";
import "./App.scss";
import NewsHeader from "./components/NewsHeader/NewsHeader";
import NewsFooter from "./components/NewsFooter/NewsFooter";
import NewsContent from "./components/NewsContent/NewsContent"; // Import NewsContent

function App() {
  return (
    <div className="App">
      <NewsHeader />
      <NewsContent /> {/* Render NewsContent */}
      <NewsFooter />
    </div>
  );
}

export default App;
