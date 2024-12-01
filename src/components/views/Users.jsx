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

function Users() {
  const adminSlice = useSelector((state) => state.admin);
  const confirm = useConfirm();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/users`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (entity) => {
    await confirm({
      description: `This will permanently delete "${entity.firstname} ${entity.lastname}" from the list.`,
    });
    try {
      const axiosConfig = {
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/users/${entity.id}`,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      setUsers(users.filter((user) => user.id !== entity.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column">
        <div className="border border-dark-subtle rounded glass-box p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4>USERS</h4>
            <Link to={"/users/create"}>
              <IconButton>
                <AddCircleIcon style={{ fontSize: "2.8rem", color: "black" }} />
              </IconButton>
            </Link>
          </div>
          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="count"></td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/users/${user.id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            handleDelete(user);
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

export default Users;
