import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BrandsService, CategoriesService, ProductService } from "./Service";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();

      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      let productsResponse = await fetch(`http://localhost:5000/products?productName_like=${search}`);
      let productsResponseBody = await productsResponse.json();

      productsResponse.ok &&
        productsResponseBody.forEach((product) => {
          // add brand name to product
          product.brand = BrandsService.getBrandByBrandId(
            brandsResponseBody,
            product.brandId
          );

          // add category name to product
          product.category = CategoriesService.getCategoryByCategoryId(
            categoriesResponseBody,
            product.categoryId
          );
        });

      setProducts(productsResponseBody);
    })();
  }, [search]);

  return (
    <div className="max-w-[1000px] mx-auto p-4 flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-3">Number of Products: <b>{products.length}</b></h1>
        <div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className="border border-slate-900 focus:outline-none rounded-md text-center"
            autoFocus
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
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
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Rating
                    </th>
                  </tr>
                </thead>
                {products.map((product) => (
                  <tr className="" key={product.id}>
                    <td className="my-1">{product.id}</td>
                    <td className="my-1">{product.productName}</td>
                    <td className="my-1">{product.price}</td>
                    <td className="my-1">{product.brand.brandName}</td>
                    <td className="my-1">{product.category.categoryName}</td>
                    <td className="my-1 flex">
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
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
