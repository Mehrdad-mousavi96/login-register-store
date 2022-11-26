import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../useContext";
import Order from "./Order";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const userContext = useContext(UserContext);

  const getPreviousOrders = (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === true);
  };

  const getCart = () => {
    return orders.filter((ord) => ord.isPaymentCompleted === false);
  };

  useEffect(() => {
    document.title = "Dashboard";

    // load data from database

    (async () => {
      const ordersResponse = await fetch(
        `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
        {
          method: "GET",
        }
      );

      if (ordersResponse.ok) {
        let ordersResponseBody = await ordersResponse.json();
        setOrders(ordersResponseBody);
      }
    })();
  }, [userContext.user.currentUserId]);

  // JSX RETURN
  return (
    <div className="flex flex-col">
      {/* ************************* Previous Orders ************************* */}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b bg-blue-400">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Product Id
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Payment Status
                  </th>
                </tr>
              </thead>
              {getPreviousOrders(orders).map((order) => (
                <Order key={order.id} order={order} />
              ))}
              {getCart(orders).map((order) => (
                <Order key={order.id} order={order} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
