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
          : "bg-emerald-200"
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
          {!order.isPaymentCompleted && (
            <div className="flex items-center">
              <div>
                <AiFillMinusCircle
                  size={13}
                  className={"mx-2 cursor-pointer text-red-600"}
                  onClick={() => setQuantity(quantity - 1)}
                />
              </div>
              <h1>{quantity >= 0 ? quantity : 0}</h1>
              <div>
                <AiFillPlusCircle
                  size={13}
                  className={"mx-2 cursor-pointer text-lime-900"}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
          )}
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
