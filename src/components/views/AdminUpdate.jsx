import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import notify from "../../notify";

function AdminUpdate() {
  const adminSlice = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const { adminId } = useParams();
  const [admin, setAdmin] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/admins/${adminId}`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        if (response.data.notFound) {
          notify(response.data.msg);
          navigate("/admins");
        }
        setAdmin({
          ...admin,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getAdmin();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const axiosConfig = {
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/admins/${adminId}`,
        data: admin,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      console.log(response);
      notify(response.data.msg);
      !response.data.constraint && navigate("/admins");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <h4 className="">UPDATE ADMIN</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={admin.firstname}
                onChange={(e) =>
                  setAdmin({ ...admin, firstname: e.target.value })
                }
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
                value={admin.lastname}
                onChange={(e) =>
                  setAdmin({ ...admin, lastname: e.target.value })
                }
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
                value={admin.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link to="/admins" className="btn btn-secondary">
                ← Back
              </Link>
              <button className="btn btn-dark ms-3"> Update </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminUpdate;
