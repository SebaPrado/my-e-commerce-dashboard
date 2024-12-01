import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function NotFound() {
  const adminSlice = useSelector((state) => state.admin);

  console.log(adminSlice);

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <div className="w-50 border border-dark-subtle rounded glass-box p-4">
          <div className="d-flex mt-4 justify-content-center mb-4">
            <img
              src="/equal-vision-old-logo.webp"
              alt=""
              className="ev-404-logo"
            />
          </div>
          <h3 className="text-center">
            Oops... we found our long-lost logo, yet we couldn't find that page!
          </h3>
        </div>
      </div>
    </>
  );
}

export default NotFound;
