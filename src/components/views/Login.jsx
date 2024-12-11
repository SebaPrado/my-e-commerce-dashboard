import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAdmin } from "../../../AdminSlice";
import notify from "../../notify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const adminSlice = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const axiosConfig = {
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/tokens/admins`,
        data: {
          email: email,
          password: password,
        },
      };
      const response = await axios(axiosConfig);

      response.data.constraint
        ? notify(response.data.msg)
        : dispatch(
            authAdmin({
              token: response.data.token,
            })
          );
    } catch (err) {
      console.log(err);
    }
  };

  return !adminSlice.token ? (
    <>
      <div className="vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row g-0">
            <div className="d-none d-md-block col-md-5 col-lg-7">
              <div className="first-box h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <img src="/equal-vision-logo.png" alt="" className="" />
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-5">
              <div className="bg-white p-5 second-box ">
                <div className="mb-4">
                  <h3>Admin Login</h3>
                </div>
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="input-group mb-5">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email - try with 'admin1@ha.dev'  "
                        value={email}
                        onChange={handleEmail}
                      />
                    </div>
                    <div className="input-group mb-5">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password - try with 'admin'"
                        value={password}
                        onChange={handlePassword}
                      />
                    </div>
                    <button className="btn custom-btn mb-5 w-100 auth-btn text-white">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  ) : (
    <Navigate to="/" replace />
  );
}

export default Login;
