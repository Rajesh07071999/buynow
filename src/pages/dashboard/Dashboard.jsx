import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaBoxOpen, FaEye, FaRupeeSign, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const dummyOrders = [
  {
    id: "ORD123456",
    date: "2025-06-19",
    total: 2599,
    items: [
      { name: "Wireless Headphones", qty: 1, price: 1999 },
      { name: "Sunglasses", qty: 1, price: 600 },
    ],
    status: "Delivered",
  },
  {
    id: "ORD789101",
    date: "2025-06-25",
    total: 4999,
    items: [{ name: "Smart Watch", qty: 1, price: 4999 }],
    status: "Shipped",
  },
  {
    id: "ORD112131",
    date: "2025-06-10",
    total: 1499,
    items: [{ name: "Bluetooth Speaker", qty: 1, price: 1499 }],
    status: "Cancelled",
  },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [filterText, setFilterText] = useState("");

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
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: "Cancelled" } : o
          )
        );
        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      }
    });
  };

  const totalExpenses = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      wrap: true,
    },
    {
      name: "Items",
      cell: (row) => (
        <ul className="list-unstyled mb-0 small">
          {row.items.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.qty} — ₹{item.price * item.qty}
            </li>
          ))}
        </ul>
      ),
      grow: 2,
    },
    {
      name: "Total",
      selector: (row) => `₹${row.total}`,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${row.status === "Delivered"
            ? "bg-success"
            : row.status === "Shipped"
              ? "bg-primary"
              : "bg-danger"
            }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deliveryDate = new Date(row.date);
        deliveryDate.setHours(0, 0, 0, 0);

        const canCancel = deliveryDate >= today && row.status !== "Delivered" && row.status !== "Cancelled";

        return (
          <div className="d-flex gap-2 align-items-center">
            <Link to={`/order/${row.id}`}>
              <FaEye size={18} title="View" className="text-secondary" />
            </Link>
            {canCancel ? (
              <FaTimesCircle
                size={18}
                className="text-danger"
                title="Cancel Order"
                style={{ cursor: "pointer" }}
                onClick={() => handleCancelOrder(row.id)}
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
      o.id.toLowerCase().includes(filterText.toLowerCase()) ||
      o.status.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container-fluid my-5">
      <h2 className="mb-4 fw-bold text-dark">Dashboard</h2>
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
            <div className="fs-5">₹{totalExpenses}</div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm p-3">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <h5 className="fw-bold text-dark mb-2"> User Order List</h5>
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
      </div>
    </div>
  );
};

export default Dashboard;
