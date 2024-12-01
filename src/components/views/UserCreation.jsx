import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import notify from "../../notify";

function UserCreation() {
  const adminSlice = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const axiosConfig = {
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/users`,
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone: phone,
          address: address,
        },
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint && navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <h4 className="">CREATE USER</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link to="/users" className="btn btn-secondary">
                ← Back
              </Link>
              <button className="btn btn-dark ms-3"> Create </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserCreation;
