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

function Admins() {
  const adminSlice = useSelector((state) => state.admin);
  const confirm = useConfirm();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [admins, setAdmins] = useState();

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/admins`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        setAdmins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdmins();
  }, []);

  const handleDelete = async (entity) => {
    await confirm({
      description: `This will permanently delete "${entity.firstname} ${entity.lastname}" from the list.`,
    });

    try {
      const axiosConfig = {
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/admins/${entity.id}`,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      setAdmins(admins.filter((admin) => admin.id !== entity.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column align-items-center ">
        <div className="w-75 border border-dark-subtle rounded glass-box p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4>ADMINS</h4>
            <Link to={"/admins/create"}>
              <IconButton>
                <AddCircleIcon style={{ fontSize: "2.8rem", color: "black" }} />
              </IconButton>
            </Link>
          </div>
          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr>
                <th scope="col" style={{ width: "10%" }}>
                  #
                </th>
                <th scope="col" style={{ width: "25%" }}>
                  Firstname
                </th>
                <th scope="col" style={{ width: "25%" }}>
                  Lastname
                </th>
                <th scope="col" style={{ width: "25%" }}>
                  Email
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins &&
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="count"></td>
                    <td>{admin.firstname}</td>
                    <td>{admin.lastname}</td>
                    <td>{admin.email}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/admins/${admin.id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            handleDelete(admin);
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

export default Admins;
