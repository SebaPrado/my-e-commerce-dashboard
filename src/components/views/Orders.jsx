import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ProductModal from "../ProductModal";
import { format } from "date-fns";

function Orders() {
  const adminSlice = useSelector((state) => state.admin);

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/orders`,
        };
        const response = await axios(axiosConfig);
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <div className="container mt-5 d-flex flex-column align-items-center ">
        <div className="w-75 border border-dark-subtle rounded glass-box p-5">
          <div className="d-flex align-items-center">
            <h4>ORDERS</h4>
          </div>

          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Customer</th>
                <th scope="col">Status</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Products</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order.id} className="text-center">
                    <td>{order.id}</td>
                    <td>{format(new Date(order.createdAt), "dd MMMM yyyy")}</td>
                    <td>{order.customerName}</td>

                    <td className="text-capitalize">{order.status}</td>
                    <td className="text-capitalize">{order.paymentMethod}</td>
                    <td>
                      <ProductModal order={order} />
                    </td>
                    <td>
                      <div>
                        <Link to={`/orders/${order.id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
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

export default Orders;
