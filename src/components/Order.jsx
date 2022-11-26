import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Order = ({ order, product }) => {
  const [quantity, setQuantity] = useState(order.quantity);
  const [price, setPrice] = useState(product.price);

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
          {price * quantity >= 0 ? price * quantity : 0}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center">
          <div>
            <AiFillMinusCircle
              size={15}
              className={"mx-2 cursor-pointer"}
              onClick={() => setQuantity(quantity - 1)}
            />
          </div>
          {quantity >= 0 ? quantity : 0}
          <div>
            <AiFillPlusCircle
              size={15}
              className={"mx-2 cursor-pointer"}
              onClick={() => setQuantity(quantity + 1)}
            />
          </div>
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.isPaymentCompleted ? (
            <p className="font-semibold">Paid</p>
          ) : (
            <Link
              target={"_blank"}
              to={"/pay"}
              className="text-sky-900 underline cursor-pointer"
            >
              Payment Gateway
            </Link>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Order;
