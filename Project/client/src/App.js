/* eslint-disable react/jsx-pascal-case */
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import Stock from "./Stock";
import Add_Trans from "./pages/Add_Trans";
import Add_Budget from "./pages/Add_Budget";
import Add_Reminder from "./pages/Add_Reminder.js";
import "./index.css";

function App() {
  return (
    <>
      {/* Main Container */}
      <div className="flex bg-[url('https://i.ibb.co/ZY2ZMrF/background.jpg')]">
        <title>Dashboard</title>
        {/* Sidebar */}
        <div className="w-[13%]">
          <Sidebar />
        </div>
        {/* End Sidebar */}

        {/* Home Page */}
        {/* <Home /> */}

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
