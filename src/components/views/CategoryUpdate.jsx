import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import notify from "../../notify";

function CategoryUpdate() {
  const adminSlice = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const { categoryId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        if (response.data.notFound) {
          notify(response.data.msg);
          navigate("/categories");
        }
        setName(response.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const axiosConfig = {
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint && navigate("/categories");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <h4 className="">UPDATE CATEGORY</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Link to="/categories" className="btn btn-secondary">
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

export default CategoryUpdate;
