import React from "react";

const Order = ({ order }) => {
  return (
    <tbody className={order.isPaymentCompleted ? 'bg-sky-200 hover:bg-sky-300' : 'bg-emerald-300 hover:bg-emerald-400'}>
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
          {order.isPaymentCompleted ? (
            <p className="font-semibold" >Paid</p>
          ) : (
            <a className="text-sky-900 underline cursor-pointer">
              Payment Gateway
            </a>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Order;
