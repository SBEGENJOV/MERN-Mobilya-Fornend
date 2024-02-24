import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import CampainDetailsPage from "./Pages/CampainDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
        <Route path="/campain/:campainId" element={<CampainDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
