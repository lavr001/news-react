import "./App.scss";
import NewsHeader from "./components/NewsHeader/NewsHeader";
import NewsFooter from "./components/NewsFooter/NewsFooter";
import NewsContent from "./components/NewsContent/NewsContent";

const App = () => {
  return (
    <div className="App">
      <NewsHeader />
      <NewsContent />
      <NewsFooter />
    </div>
  );
};

export default App;
