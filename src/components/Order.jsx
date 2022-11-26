import React from "react";
import { Link } from "react-router-dom";

const Order = ({ order, product }) => {
  return (
    <tbody
      className={
        order.isPaymentCompleted
          ? "bg-sky-200 hover:bg-sky-300"
          : "bg-emerald-300 hover:bg-emerald-400"
      }
    >
      <tr className="border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {order.id}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {product.productName}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {product.price}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.quantity}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.isPaymentCompleted ? (
            <p className="font-semibold">Paid</p>
          ) : (
            <Link to={"/pay"} className="text-sky-900 underline cursor-pointer">
              Payment Gateway
            </Link>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Order;
