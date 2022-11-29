import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import { UserContext } from "../useContext";
import Order from "./Order";
import { OrdersService, ProductService } from "./Service";

const Dashboard = () => {
  const [close, setClose] = useState({
    sucBtn: false,
    delBtn: false,
  });
  const [orders, setOrders] = useState([]);
  const [showOrderDeleteAlert, setShowOrderDeleteAlert] = useState(false);
  const [showOrderPlaceAlert, setShowOrderPlaceAlert] = useState(false);

  const userContext = useContext(UserContext);

  OrdersService.getPreviousOrders(orders);
  OrdersService.getCart(orders);

  /////////////////////////// loadDataFromDataBase ///////////////////////////
  const loadDataFromDataBase = useCallback(async () => {
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
  }, []);
  /////////////////////////// end of loadDataFromDataBase ///////////////////////////

  useEffect(() => {
    document.title = "Dashboard";
    loadDataFromDataBase();
  }, [userContext.user.currentUserId]);

  // /////////////////////////// start onBuy ////////////////////////////
  const onBuyNowClick = useCallback(
    async (orderId, userId, productId, quantity) => {
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
          setShowOrderPlaceAlert(true);
        }
      }
    },
    [loadDataFromDataBase]
  );
  // /////////////////////////// end of onBuy ////////////////////////////

  // /////////////////////////// start onDelete ///////////////////////////
  const onDeleteClick = async (orderId) => {
    if (window.confirm("Are you sure to Delete?")) {
      let orderResponse = await fetch(
        `http://localhost:5000/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (orderResponse.ok) {
        let orderResponseBody = await orderResponse.json();
        loadDataFromDataBase();
        setShowOrderDeleteAlert(true);
      }
    }
  };
  // /////////////////////////// end of noDelete ///////////////////////////

  // JSX RETURN
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {/* /////////////////////////// Delete Alert /////////////////////////// */}
            {showOrderDeleteAlert && (
              <div
                className={
                  close.delBtn
                    ? "hidden"
                    : "bg-red-100 border border-red-400 duration-300 text-red-700 my-4 w-3/6 mx-auto px-4 py-3 rounded relative"
                }
                role="alert"
              >
                <strong className="font-bold mx-4">Deleted!</strong>
                <span className="block sm:inline">
                  Your Order Deleted Successfully
                </span>
                <span
                  onClick={() => setClose({ ...close, delBtn: true })}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 "
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            {/* /////////////////////////// end of Delete Alert /////////////////////////// */}

            {/* /////////////////////////// Buy Alert /////////////////////////// */}
            {showOrderPlaceAlert && (
              <div
                className={
                  close.sucBtn
                    ? "hidden"
                    : "bg-blue-100 border duration-300 border-blue-400 text-blue-700  my-4 w-3/6 mx-auto px-4 py-3 rounded relative"
                }
                role="alert"
              >
                <strong className="font-bold mx-4">Completed</strong>
                <span className="block sm:inline">
                  Thanks for your Shopping
                </span>
                <span
                  onClick={() => setClose({ ...close, sucBtn: true })}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <svg
                    className="fill-current h-6 w-6 text-blue-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            {/* /////////////////////////// end of Buy Alert /////////////////////////// */}
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
                  onDeleteClick={onDeleteClick}
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
