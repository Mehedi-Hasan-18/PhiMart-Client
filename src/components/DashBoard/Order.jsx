import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClint from "../../services/authapiClient";
import { format, parseISO } from "date-fns";

const Order = () => {
  const { user } = useAuthContext();
  const [orders, setOrder] = useState([]);

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

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await authApiClint.get("/orders/");
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  });

  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {user?.first_name} {user?.last_name}
                  </td>
                  <td>
                    <div className={`badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </div>
                  </td>
                  <td>
                    {format(
                      parseISO(`${order.created_at}`),
                      "HH:mm yyyy-MM-dd "
                    )}
                  </td>
                  <td>${order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
