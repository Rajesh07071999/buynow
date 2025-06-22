import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaBoxOpen, FaEye, FaRupeeSign, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { orderListing, cancelOrder } from "../../store/slices/orderSlice";
import { useDispatch } from "react-redux";
import { BallTriangle } from "react-loader-spinner";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filterText, setFilterText] = useState("");
  const dispatch = useDispatch()
  const [totalExpenses, setTotalExpenses] = useState()
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
  
          const total = orders.reduce(
            (sum, o) => o.status !== "Cancelled" ? sum + (o.grand_total || 0) : sum,
            0
          );
          setTotalExpenses(total);
        } else {
          setOrders([]);
          setTotalExpenses(0);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
        setOrders([]);
        setTotalExpenses(0);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

  useEffect(() => {

    fetchOrderHistory();
  }, []);

 


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

        return (
          <div className="d-flex gap-2 align-items-center">
            <Link to={`/order/${row.order_id}`}>
              <FaEye size={18} title="View" className="text-secondary" />
            </Link>
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
      <h2 className="mb-4 fw-bold text-dark">Order History</h2>

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
          <div className="card shadow-sm p-3">
            <div className="d-flex flex-wrap justify-content-between mb-3">
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
        </>
      )}
    </div>
  );
};

export default OrderHistory;
