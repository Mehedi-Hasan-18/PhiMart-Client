import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClint from "../../services/authapiClient";

const OrderCard = ({ order, handleOrderCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);

  const handleOrderStatus = (event) => {
    const newStatus = event.target.value;
    try {
      authApiClint
        .patch(`/orders/${order.id}/update_status/`, { status: newStatus })
        .then((response) => {
          if (response.status == 200) {
            setStatus(newStatus);
          }
          alert(response.data.status);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayNow = async () => {
    try {
      const response = await authApiClint.post("/payment/initiate/", {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items.length,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "Not Paid":
        return "badge-warning";
      case "Shipped":
        return "badge-info";
      case "Delivered":
        return "badge-success";
      case "Canceled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
      {/* Add commentMore actions */}
      <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
        </div>
        <div className="flex gap-2">
          {user.is_staff ? (
            <select
              className={`badge ${getStatusClass(order.status)}`}
              value={status}
              onChange={handleOrderStatus}
            >
              <option value="Not Paid">Not Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled </option>
            </select>
          ) : (
            <span
              className={`px-3 py-3 rounded-full text-white text-sm font-medium `}
            >
              {order.status}
            </span>
          )}
          {order.status !== "Deliverd" &&
            order.status != "Canceled" &&
            !user.is_staff && (
              <button
                onClick={() => handleOrderCancel(order.id)}
                className="text-blue-700 hover:underline"
              >
                Cancel
              </button>
            )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-medium text-lg mb-4">Order Items</h3>
        {/* Order Items Table  */}
        <OrderTable items={order.items} />
      </div>
      <div className="border-t p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-[200px]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
        </div>
        {!user.is_staff && order.status === "Not Paid" && (
          <button
            onClick={handlePayNow}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
