import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import notify from "../../notify";

function OrderUpdate() {
  const adminSlice = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!adminSlice.token) {
    return <Navigate to="/login" replace />;
  }

  const { orderId } = useParams();
  const [order, setOrder] = useState({
    status: "",
    paymentMethod: "",
    products: "",
  });

  useEffect(() => {
    const getOrder = async () => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
          headers: {
            Authorization: "Bearer " + adminSlice.token,
          },
        };
        const response = await axios(axiosConfig);
        if (response.data.notFound) {
          notify(response.data.msg);
          navigate("/");
        }
        setOrder({
          ...order,
          status: response.data.status,
          paymentMethod: response.data.paymentMethod,
          products: response.data.products,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const axiosConfig = {
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        data: order,
        headers: {
          Authorization: "Bearer " + adminSlice.token,
        },
      };
      const response = await axios(axiosConfig);
      notify(response.data.msg);
      !response.data.constraint && navigate("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="w-50 border border-dark-subtle rounded glass-box p-5">
          <h4 className="">UPDATE ORDER</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                name="status"
                id="status"
                value={order.status}
                onChange={(e) => setOrder({ ...order, status: e.target.value })}
              >
                <option disabled>Choose status...</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
                <option value="paid">Paid</option>
                <option value="transit">Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">
                Payment Method
              </label>
              <select
                disabled
                className="form-select"
                name="paymentMethod"
                id="paymentMethod"
                value={order.paymentMethod}
                onChange={(e) =>
                  setOrder({ ...order, paymentMethod: e.target.value })
                }
              >
                <option value="N/A">Choose Payment Method...</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            {/* <div className="mb-3">
              <label htmlFor="products" className="form-label">
                Products
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="products"
                name="products"
                value={order.products}
                onChange={(e) =>
                  setOrder({ ...order, products: e.target.value })
                }
              />
            </div> */}

            <div className="d-flex justify-content-end mt-4">
              <Link to="/orders" className="btn btn-secondary">
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

export default OrderUpdate;
