import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ProductModal from "../ProductModal";
import { format } from "date-fns";

function Dashboard() {
  const adminSlice = useSelector((state) => state.admin);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

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

  useEffect(() => {
    if (pieChartRef.current && orders) {
      const paymentMethodCounts = {
        card: 0,
        paypal: 0,
      };

      orders.forEach((order) => {
        paymentMethodCounts[order.paymentMethod]++;
      });

      const labels = ["Card", "Paypal"];
      const data = Object.values(paymentMethodCounts);

      pieChartRef.current.data.labels = labels;
      pieChartRef.current.data.datasets[0].data = data;
      pieChartRef.current.update();
    }
  }, [orders]);

  useEffect(() => {
    if (chartRef.current && orders) {
      const statusCounts = {
        pending: 0,
        declined: 0,
        paid: 0,
        transit: 0,
        delivered: 0,
      };

      orders.forEach((order) => {
        statusCounts[order.status]++;
      });

      const labels = ["Pending", "Declined", "Paid", "Transit", "Delivered"];
      const data = Object.values(statusCounts);

      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.update();
    }
  }, [orders]);

  useEffect(() => {
    const graph = document.getElementById("lineChart");
    if (graph && !chartRef.current) {
      chartRef.current = new Chart(graph, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Delete",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    const pieGraph = document.getElementById("pieChart");
    if (pieGraph && !pieChartRef.current) {
      pieChartRef.current = new Chart(pieGraph, {
        type: "pie",
        data: {
          labels: [],
          datasets: [
            {
              label: "Payment Method Graph",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
        pieChartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="dashboard-section mx-auto p-4">
      <div className="row justify-content-around ">
        <div className="col-12 col-lg-8 d-flex justify-content-center">
          <canvas id="lineChart" className="lineChart"></canvas>
        </div>
        <div className="col-12 col-lg-4 d-flex justify-content-center mt-5 mt-lg-0">
          <canvas id="pieChart" className="pieChart"></canvas>
        </div>
      </div>
      <div className="container mt-5 d-flex flex-column">
        <div className="border border-dark-subtle rounded glass-box p-5">
          <h4>FULFILLED ORDERS</h4>
          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Customer</th>
                <th scope="col">Status</th>
                <th scope="col">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders
                  .filter((order) => order.status === "paid")
                  .map((order) => (
                    <tr key={order.id} className="text-center">
                      <td>{order.id}</td>
                      <td>
                        {format(new Date(order.createdAt), "dd MMMM yyyy")}
                      </td>
                      <td>{order.customerName}</td>

                      <td className="text-capitalize">{order.status}</td>
                      <td className="text-capitalize">{order.paymentMethod}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
