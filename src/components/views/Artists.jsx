import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import notify from "../../notify";
import { useConfirm } from "material-ui-confirm";

function Artists() {
  const adminSlice = useSelector((state) => state.admin);
  const confirm = useConfirm();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [artists, setArtists] = useState();

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

  const handleDelete = async (entity) => {
    await confirm({
      description: `This will permanently delete "${entity.name}" from the list.`,
    });

    try {
      const axiosConfig = {
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/artists/${entity.id}`,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint &&
        setArtists(artists.filter((artist) => artist.id !== entity.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column align-items-center">
        <div className="w-75 border border-dark-subtle rounded glass-box p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4>ARTISTS</h4>
            <Link to={"/artists/create"}>
              <IconButton>
                <AddCircleIcon style={{ fontSize: "2.8rem", color: "black" }} />
              </IconButton>
            </Link>
          </div>
          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "40%" }}>Name</th>
                <th style={{ width: "40%" }}>Description</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists &&
                artists.map((artist) => (
                  <tr key={artist.id}>
                    <td className="count"></td>
                    <td>{artist.name}</td>
                    <td>{artist.description}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/artists/${artist.id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            handleDelete(artist);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Artists;
