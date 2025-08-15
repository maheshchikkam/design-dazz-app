import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <h1 className="text-3xl">Design Dazz App</h1>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
