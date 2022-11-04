import "./App.css";
import LayoutScreen from "./pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowDataScreen from "./pages/ShowData";
import AddData from "./pages/AddData";
import HandleData from "./pages/HandleData";
import { LoginScreen } from "./Login";
import { getToken } from "./common/token";

function App() {
  const istoken = getToken();
  console.log(istoken);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/" element={<LayoutScreen />}>
            <Route path="showData" element={<ShowDataScreen />} />
            <Route path="addData" element={<AddData />} />
            <Route path="handleData" element={<HandleData />} />
          </Route>
          <Route index element={istoken?<LoginScreen />:<LayoutScreen />}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;
