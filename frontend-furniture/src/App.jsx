import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
