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
        // get all data from product
        let productsResponse = await fetch("http://localhost:5000/products", {
          method: "GET",
        });

        if (productsResponse.ok) {
          let productsResponseBody = await productsResponse.json();

          ordersResponseBody.forEach((order) => {
            order.product = productsResponseBody.find(
              (prod) => prod.id === order.productId
            );
          });
        }
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
                    Order Id
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Qunatity
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              {getPreviousOrders(orders).map((order) => (
                <Order 
                key={order.id} 
                order={order}
                product={order.product}
                />
              ))}
              {getCart(orders).map((order) => (
                <Order product={order.product} key={order.id} order={order} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
