import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex bg-[url('https://i.ibb.co/ZY2ZMrF/background.jpg')]">
        <title>Dashboard</title>
        {/* Sidebar */}
        <div className="w-[13%]">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
export default App;
