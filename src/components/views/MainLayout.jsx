import { Outlet } from "react-router-dom";
import DSidebar from "../DSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  return (
    <>
      <div className="outer-container d-flex" style={{ minHeight: "100vh" }}>
        <DSidebar />
        <Outlet />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </>
  );
}

export default MainLayout;
