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

function Categories() {
  const adminSlice = useSelector((state) => state.admin);
  const confirm = useConfirm();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [categories, setCategories] = useState();

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

  const handleDelete = async (entity) => {
    await confirm({
      description: `This will permanently delete "${entity.name}" from the list.`,
    });

    try {
      const axiosConfig = {
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/categories/${entity.id}`,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint &&
        setCategories(
          categories.filter((category) => category.id !== entity.id)
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column align-items-center">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4>CATEGORIES</h4>
            <Link to={"/categories/create"}>
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
                <th scope="col" style={{ width: "70%" }}>
                  Name
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category) => (
                  <tr key={category.id}>
                    <td className="count"></td>
                    <td>{category.name}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/categories/${category.id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            handleDelete(category);
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

export default Categories;
