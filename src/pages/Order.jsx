import { useEffect, useState } from "react";
import OrderCard from "../components/Order/OrderCard";
import authApiClint from "../services/authapiClient";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await authApiClint.get("/orders/");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const handleOrderCancel = async (orderId) => {
    try {
      const response = await authApiClint.post(`/orders/${orderId}/cancel/`);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Show loading state
  if (loading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  // Show message if no orders
  if (!loading && orders.length === 0)
    return <div className="text-center py-10">No orders found.</div>;

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          handleOrderCancel={handleOrderCancel}
        />
      ))}
    </div>
  );
};

export default Order;
