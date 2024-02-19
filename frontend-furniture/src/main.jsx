import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./Redux/Store/store.js";
import MainLayout from "./layout/MainLayout.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainLayout>
        <App />
      </MainLayout>
    </Provider>
  </React.StrictMode>
);
