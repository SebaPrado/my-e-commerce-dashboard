import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import notify from "../../notify";

function ArtistUpdate() {
  const adminSlice = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const { artistId } = useParams();
  const [artist, setArtist] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const getArtist = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/artists/${artistId}`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        if (response.data.notFound) {
          notify(response.data.msg);
          navigate("/artists");
        }
        setArtist({
          ...artist,
          name: response.data.name,
          description: response.data.description,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getArtist();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const axiosConfig = {
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/artists/${artistId}`,
        data: artist,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint && navigate("/artists");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <h4 className="">UPDATE ARTIST</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={artist.name}
                onChange={(e) => setArtist({ ...artist, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={artist.description}
                onChange={(e) =>
                  setArtist({ ...artist, description: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link to="/artists" className="btn btn-secondary">
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

export default ArtistUpdate;
