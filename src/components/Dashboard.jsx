import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../useContext";

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
      const response = await fetch(
        `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        let responseBody = await response.json();
        setOrders(responseBody);
      }
    })();
  }, [userContext.user.currentUserId]);

  console.log(orders);

  // JSX RETURN
  return (
    <div className="flex flex-col">
      {/* ************************* Previous Orders ************************* */}
      <h1 className="mx-auto my-2 bg-blue-400 px-4 py-2">Previous Orders</h1>
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
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.productId}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.quantity}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.isPaymentCompleted && "Paid"}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>

      {/* ************************* Cart ************************* */}
      <h1 className="mx-auto my-2 bg-green-500 px-4 py-2">Cart</h1>
      <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b bg-green-500">
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
              {getCart(orders).map((order) => (
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.productId}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.quantity}
                    </td>
                    <td className="text-sm underline cursor-pointer  font-light px-6 py-4 whitespace-nowrap">
                      <a className="text-sky-900" href="#">
                        {!order.isPaymentCompleted && "Payment gateway"}
                      </a>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
