import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/ai";

const Order = ({ order, product, onBuyNowClick, onDeleteClick }) => {
  console.log("<Order />");

  const [quantity, setQuantity] = useState(order.quantity);
  const [price, setPrice] = useState(product.price);

  return (
    <tbody
      className={
        order.isPaymentCompleted ? "bg-gray-200" : "bg-sky-200 hover:bg-sky-300"
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
          {!order.isPaymentCompleted ? (
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
          ) : (
            quantity
          )}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.isPaymentCompleted ? (
            <p className="font-semibold">Paid</p>
          ) : (
            <div className="flex">
              <button
                onClick={() => {
                  onBuyNowClick(
                    order.id,
                    order.userId,
                    order.productId,
                    order.quantity
                  );
                }}
                className="mx-4 border border-sky-900 px-2 py-1 text-white bg-sky-900"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  onDeleteClick(order.id);
                }}
              >
                <AiFillDelete className="text-red-700" size={20} />
              </button>
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Order;
