import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Profile from "./pages/ProfilePage";
import ListHuruf from "./pages/ListPage";
import Search from "./pages/SearchPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("search");

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile />;
      case "list":
        return <ListHuruf />;
      case "search":
        return <Search />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-black-100 flex justify-center">
      <div
        className="
      w-full max-w-3xl 
      bg-white 
      shadow 
      rounded-xl"
      >
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <div>{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;
