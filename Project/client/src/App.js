/* eslint-disable react/jsx-pascal-case */
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";

import Stock from "./Stock";
import Add_Trans from "./pages/Add_Trans";
import Add_Budget from "./pages/Add_Budget";
import Add_Reminder from "./pages/Add_Reminder.js";
import Home from "./Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex h-screen bg-[url('https://i.ibb.co/ZY2ZMrF/background.jpg')]">
        {/* Main Container */}

        {/* End Sidebar */}

        {/* Home Page */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/add_transaction" element={<Add_Trans />} />
            <Route path="/add_budget" element={<Add_Budget />} />
            <Route path="/add_reminder" element={<Add_Reminder />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </BrowserRouter>

        {/* Stocks Page */}
        {/* <Stock /> */}

        {/* Add Transaction Page */}
        {/* <Add_Trans /> */}

        {/* Add Budget Page */}
        {/* <Add_Budget /> */}

        {/* Add Bill Reminder Page */}
        {/* <Add_Reminder /> */}

        {/* End of Main Container */}
      </div>
    </>
  );
}
export default App;
