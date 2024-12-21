import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="bg-[#000000f3] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
