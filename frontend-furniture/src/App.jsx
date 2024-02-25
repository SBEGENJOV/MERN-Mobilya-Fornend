import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import CampainDetailsPage from "./Pages/CampainDetailsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage ";
import AuthPage from "./Pages/AuthPage";
import UserPage from "./Component/Auth/UserPage";
import BlogPage from "./Pages/BlogPage";
import CampainPage from "./Pages/CampainPage";
import ProductCategory from "./Component/Product/ProductCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
        <Route path="/campain/:campainId" element={<CampainDetailsPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/campain" element={<CampainPage />} />
        <Route
          path="/productCategory/:name/:productTypeId"
          element={<ProductCategory />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
