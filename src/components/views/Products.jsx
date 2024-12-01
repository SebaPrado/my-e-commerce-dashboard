import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import notify from "../../notify";
import { useConfirm } from "material-ui-confirm";
import TracklistModal from "../TracklistModal";

function Products() {
  const adminSlice = useSelector((state) => state.admin);
  const confirm = useConfirm();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        if (response.data.notFound) {
          notify(response.data.msg);
        }
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (entity) => {
    await confirm({
      description: `This will permanently delete "${entity.name}" from the list.`,
    });
    try {
      const axiosConfig = {
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/products/${entity.id}`,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      setProducts(products.filter((product) => product.id !== entity.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column">
        <div className="border border-dark-subtle rounded glass-box p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="">PRODUCTS</h4>
            <Link to={"/products/create"}>
              <IconButton>
                <AddCircleIcon style={{ fontSize: "2.8rem", color: "black" }} />
              </IconButton>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover mt-4">
              <thead className="">
                <tr className="">
                  <th style={{ width: "8%" }}>#</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "20%" }}>Artist</th>
                  <th style={{ width: "12%" }}>Image</th>
                  <th style={{ width: "10%" }}>Price</th>
                  <th style={{ width: "10%" }}>Stock</th>
                  <th style={{ width: "10%" }}>Category</th>
                  <th style={{ width: "10%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product.id} className="product-table">
                      <td className="count"></td>
                      <td>{product.name}</td>
                      <td>{product.artist.name}</td>
                      <td>
                        <img
                          className="img-table"
                          src={`${import.meta.env.VITE_IMG_URL}/products/${
                            product.image
                          }`}
                          alt=""
                        />
                      </td>
                      <td>USD {product.price}</td>
                      <td>{product.stock}</td>

                      <td>{product.category.name}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <TracklistModal product={product} />
                          <Link to={`/products/${product.id}`}>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={() => {
                              handleDelete(product);
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
      </div>
    </>
  );
}

export default Products;
