import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import CampainDetailsPage from "./Pages/CampainDetailsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage ";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
        <Route path="/campain/:campainId" element={<CampainDetailsPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/user" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
