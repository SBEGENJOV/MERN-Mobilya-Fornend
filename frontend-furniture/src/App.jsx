import "./App.css";
import Header from "./Component/Header/Header";
import GlobalNotfication from "./Component/Global/globalNotfication";
import Category from "./Component/Category/Category";

function App() {
  return (
    <div>
      <GlobalNotfication />
      <Header />
      <Category />
    </div>
  );
}

export default App;
