import React from "react";
import { AiFillCheckCircle, AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCartClick }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img
          className=" rounded-t-lg w-[350px] h-[380px]"
          src={product.img}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5 my-2">
        <a>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.productName}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {[...Array(product.rating).keys()].map((el) => {
            return (
              <svg
                key={el}
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Fifth star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            );
          })}
          {[...Array(5 - product.rating).keys()].map((el) => {
            return (
              <svg
                key={el}
                aria-hidden="true"
                className="w-5 h-5 text-gray-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Fifth star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            );
          })}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {product.rating}
          </span>
          <p className=" text-sky-800 text-xs font-bold px-2.5 py-0.5 rounded dark:text-blue-200">
            #{""}
            {product.brand.brandName}
          </p>
          <p className=" text-sky-800 text-xs font-bold px-2.5 py-0.5 rounded dark:text-blue-200">
            #{""}
            {product.category.categoryName}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <button
            onClick={() => onAddToCartClick(product)}
            className={
              product.isOrdered
                ? "flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : "flex items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            }
          >
            {product.isOrdered ? (
              <>
                Added{" "}
                <AiFillCheckCircle
                  className="ml-2 flex items-center"
                  size={19}
                />
              </>
            ) : (
              <>
                Add to Cart <AiFillShopping className="ml-2" size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
