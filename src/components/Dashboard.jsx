import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../useContext";
import Order from "./Order";
import { OrdersService, ProductService } from "./Service";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const userContext = useContext(UserContext);

  OrdersService.getPreviousOrders(orders);
  OrdersService.getCart(orders);

  const loadDataFromDataBase = async () => {
    const ordersResponse = await fetch(
      `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
      {
        method: "GET",
      }
    );

    if (ordersResponse.ok) {
      let ordersResponseBody = await ordersResponse.json();
      // get all data from product
      let productsResponse = await ProductService.fetchProducts();

      if (productsResponse.ok) {
        let productsResponseBody = await productsResponse.json();

        ordersResponseBody.forEach((order) => {
          order.product = ProductService.getProductByProductId(
            productsResponseBody,
            order.productId
          );
        });
      }
      setOrders(ordersResponseBody);
    }
  }
      // load data from database

      
  

  useEffect(() => {
    document.title = "Dashboard";
    loadDataFromDataBase();
  }, [userContext.user.currentUserId, loadDataFromDataBase]);

  // /////////////////////////// begining of function ////////////////////////////
  const onBuyNowClick = async (orderId, userId, productId, quantity) => {
    if (window.confirm("Do you wanna pay?")) {
      const updateOrder = {
        id: orderId,
        userId,
        productId,
        quantity,
        isPaymentCompleted: true,
      };
      let orderResponse = await fetch(
        `http://localhost:5000/orders/${orderId}`,
        {
          method: "PUT",
          body: JSON.stringify(updateOrder),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      let orderResponseBody = await orderResponse.json();
      if (orderResponse.ok) {
        loadDataFromDataBase();
      }
    }
  };
  // /////////////////////////// end of function ////////////////////////////

  // JSX RETURN
  return (
    <div className="flex flex-col">
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
              {OrdersService.getPreviousOrders(orders).map((order) => (
                <Order key={order.id} order={order} product={order.product} />
              ))}
              {OrdersService.getCart(orders).map((order) => (
                <Order
                  product={order.product}
                  key={order.id}
                  order={order}
                  onBuyNowClick={onBuyNowClick}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
