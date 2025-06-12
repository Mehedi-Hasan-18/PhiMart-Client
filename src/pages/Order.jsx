import { useEffect, useState } from "react";
import OrderCard from "../components/Order/OrderCard";
import authApiClint from "../services/authapiClient";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    authApiClint.get("/orders/").then((res) => setOrders(res.data));
  });

  const handleOrderCancel = async (orderId) => {
    try {
      const response = await authApiClint.post(`/orders/${orderId}/cancel/`);
      if (response.status === 200) {
        setOrders((prevOrder) =>
          prevOrder.map((order) =>
            order.id == orderId ? { ...order, status: "Canceled " } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!orders) return <div>Loading.....</div>;
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} handleOrderCancel={handleOrderCancel}></OrderCard>
      ))}
    </div>
  );
};

export default Order;
