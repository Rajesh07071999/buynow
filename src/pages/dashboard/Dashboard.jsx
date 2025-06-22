import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaBoxOpen, FaEye, FaRupeeSign, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { orderListing, cancelOrder } from "../../store/slices/orderSlice";
import { useDispatch } from "react-redux";
import { BallTriangle } from "react-loader-spinner";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filterText, setFilterText] = useState("");
  const dispatch = useDispatch()
  const [totalExpenses, setTotalExpenses] = useState()
  const [monthlyStats, setMonthlyStats] = useState([]);
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const res = await dispatch(orderListing({}));

      if (res?.payload?.code == 200) {
        const orders = res.payload.data.orders || [];
        setOrders(orders);
        setMonthlyStats(res.payload.data.monthlyStats || []);

        const total = orders.reduce(
          (sum, o) => o.status !== "Cancelled" ? sum + (o.grand_total || 0) : sum,
          0
        );
        setTotalExpenses(total);
      } else {
        setOrders([]);
        setMonthlyStats([]);
        setTotalExpenses(0);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setMonthlyStats([]);
      setTotalExpenses(0);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };


  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cancelOrder({ id: orderId })).then((res) => {
          console.log(res.payload);

          if (res.payload.code == 200) {
            fetchOrderHistory()
          }
          else if (res.parse.code == 404) {
            setOrders([])
          }
        });
      }
    });
  };


  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.order_id,
      sortable: true,
      wrap: true,
      grow: 2,

    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.orderDetails.delivery_date).toLocaleDateString(),
      sortable: true,
      wrap: true,
    },
    {
      name: "Items",
      cell: (row) => (
        <ul className="list-unstyled mb-0 small">
          {row.productDetails.map((product, idx) => (
            <li key={idx}>{product.name} × {row.qty}</li>
          ))}
        </ul>
      ),
      grow: 2,
    },
    {
      name: "Total",
      selector: (row) => `₹${row.grand_total}`,
      cell: (row) => (
        <ul className="list-unstyled mb-0 small">
          {row.productDetails.map((product, idx) => (
            <li key={idx}>₹{product.price * row.qty}</li>
          ))}
        </ul>
      ),
      sortable: true,
    },

    {
      name: "Status",
      cell: (row) => {
        const statusClass =
          row.status === "Delivered"
            ? "bg-success"
            : row.status === "Shipped"
              ? "bg-primary"
              : "bg-danger";
        return <span className={`badge ${statusClass}`}>{row.status}</span>;
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deliveryDate = new Date(row.orderDetails.delivery_date);
        deliveryDate.setHours(0, 0, 0, 0);

        const canCancel =
          deliveryDate >= today &&
          row.status !== "Delivered" &&
          row.status !== "Cancelled";

        return (
          <div className="d-flex gap-2 align-items-center">
            <Link to={`/order/${row.orderDetails._id}`}>
              <FaEye size={18} title="View" className="text-secondary" />
            </Link>
            {canCancel ? (
              <FaTimesCircle
                size={18}
                className="text-danger"
                title="Cancel Order"
                style={{ cursor: "pointer" }}
                onClick={() => handleCancelOrder(row._id)}
              />
            ) : (
              <FaTimesCircle
                size={18}
                className="text-secondary"
                title="Cannot Cancel"
                style={{ opacity: 0.4 }}
              />
            )}
          </div>
        );
      },
    },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o.order_id?.toLowerCase().includes(filterText.toLowerCase()) ||
      o.status?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container-fluid my-5">
      <h2 className="mb-4 fw-bold text-dark">Dashboard</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-lg-2">
              <div className="card shadow-sm text-center p-3 bg-dark text-white">
                <FaBoxOpen size={32} className="mb-2" />
                <div className="fw-bold">Total Orders</div>
                <div className="fs-5">{orders.length}</div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="card shadow-sm text-center p-3 bg-primary text-white">
                <FaRupeeSign size={32} className="mb-2" />
                <div className="fw-bold">Total Expenses</div>
                <div className="fs-5">₹{Number(totalExpenses).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm p-3">
            <div className="d-flex flex-wrap justify-content-between mb-3">
              <h5 className="fw-bold text-dark mb-2">User Order List</h5>
              <input
                type="text"
                className="form-control w-auto"
                style={{ minWidth: "200px" }}
                placeholder="Search by ID or Status"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <div style={{ overflowX: "auto" }}>
              <DataTable
                columns={columns}
                data={filteredOrders}
                pagination
                responsive
                striped
                highlightOnHover
                persistTableHead
              />
            </div>
            <div className="mt-5 card p-4 shadow-sm">
              <h5 className="fw-bold text-dark mb-3">Order & Expense Trends (Last Few Months)</h5>
              {monthlyStats.length === 0 ? (
                <p className="text-muted">No order data available for chart.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={monthlyStats}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="month" tick={{ fill: "#333", fontSize: 12 }} />
                    <YAxis
                      tickFormatter={(value) => `₹${value}`}
                      tick={{ fill: "#333", fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value, name) =>
                        name === "Total Spent (₹)" ? [`₹${value}`, name] : [value, name]
                      }
                      contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ fontSize: "14px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orderCount"
                      stroke="#007bff"
                      strokeWidth={2}
                      name="Orders"
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalSpent"
                      stroke="#28a745"
                      strokeWidth={2}
                      name="Total Spent (₹)"
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>


          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
