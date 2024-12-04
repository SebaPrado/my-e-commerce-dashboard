import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import notify from "../../notify";
import { MuiChipsInput } from "mui-chips-input";

function ProductCreation() {
  const adminSlice = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [featured, setFeatured] = useState("");

  const [categories, setCategories] = useState();
  const [artists, setArtists] = useState();

  const [chips, setChips] = useState([]);

  const handleChange = (newChips) => {
    setChips(newChips);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/categories`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/artists`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        setArtists(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getArtists();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    chips.map((value) => {
      formData.append("tracklist[]", value);
    });

    try {
      const axiosConfig = {
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/products`,
        data: formData,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint && navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <h4 className="">CREATE PRODUCT</h4>
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
              <label htmlFor="artist" className="form-label">
                Artist
              </label>

              <select
                className="form-select"
                name="artistId"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              >
                <option disabled>Choose Artist...</option>
                {artists &&
                  artists.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

      {/* =================             ↓↓↓    Subimos la imagen     ↓↓    ===========================          */}
            
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

      {/* =================            ↑↑      Subimos la imagen   ↑↑      ===========================          */}

            <div>
              <label className="form-label">Tracklist</label>
            </div>
            <MuiChipsInput
              value={chips}
              onChange={handleChange}
              className="mb-3 form-control"
            />

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>

              <select
                className="form-select"
                name="categoryId"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled>Choose Category...</option>
                {categories &&
                  categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="featured" className="form-label">
                Featured
              </label>

              <select
                className="form-select"
                name="featured"
                id="featured"
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
              >
                <option disabled>Set Featured Product...</option>
                <option selected value="false">
                  Off
                </option>
                <option value="true">On</option>
              </select>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Link to="/products" className="btn btn-secondary">
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

export default ProductCreation;
