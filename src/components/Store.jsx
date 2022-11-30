import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext";
import { BrandsService, CategoriesService, ProductService } from "./Service";

const Store = () => {
  const userContext = useContext(UserContext);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      // fetch Brands
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();
      brandsResponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setBrands(brandsResponseBody);

      // fetch Categories
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();
      categoriesResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setCategories(categoriesResponseBody);

      // fetch Products
      let productsResponse = await ProductService.fetchProducts();
      let productsResponseBody = await productsResponse.json();

      productsResponse.ok && (
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
          // add isordered to product
          product.isOrdered = false;
        })
      )
      
      setProducts(productsResponseBody);
    })();
  }, []);

  console.log(products);

  // updateBrandIsChecked function //
  const updateBrandIsChecked = (id) => {
    let brandsData = brands.map((brand) => {
      brand.id === id && (brand.isChecked = !brand.isChecked);
      return brand;
    });
    setBrands(brandsData);
  };

  // updateCategoryIsChecked function //
  const updateCategoryIsChecked = (id) => {
    let categoriesData = categories.map((category) => {
      category.id === id && (category.isChecked = !category.isChecked);
      return category;
    });
    setCategories(categoriesData);
  };

  // JSX RETURN
  return (
    <div>
      <div className="flex">
        {/* ******************* start left side ******************* */}
        <div>
          <div className="flex flex-col w-1/6 h-screen">
            {/* start headers */}
            <div className="w-full h-1/5">
              <p>Headers</p>
            </div>
            {/* end of headers */}

            {/* start brands */}
            <div className=" h-1/2 flex flex-col justify-start px-3 items-left">
              <div>
                <h1 className="sm:text-lg text-sm tracking-wide my-2 font-semibold">
                  Brands
                </h1>
                <ul>
                  {brands.map((brand) => (
                    <li
                      className="sm:text-lg text-sm tracking-wide my-1 mx-3 font-light flex items-center"
                      key={brand.id}
                    >
                      <input
                        className="w-4 h-4 my-3 text-blue-600 mr-3 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        value={"true"}
                        // checked={brand.isChecked}
                        type="checkbox"
                        id={`brand${brand.id}`}
                        onChange={() => {
                          updateBrandIsChecked(brand.id);
                        }}
                      />
                      <label htmlFor={`brand${brand.id}`}>
                        {brand.brandName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* end of brands */}

            {/* start categories */}
            <div className="h-1/3 px-4 ">
              <div>
                <h1 className="sm:text-lg text-sm tracking-wide my-2  font-semibold">
                  Categories
                </h1>
                <div className=" h-1/2 flex flex-col justify-center items-left">
                  <div>
                    <ul>
                      {categories.map((category) => (
                        <li
                          className="sm:text-lg text-sm tracking-wide my-3 mx-3 font-light flex items-center"
                          key={category.id}
                        >
                          <input
                            className="w-4 h-4 my-3 text-blue-600 mr-3 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            value={"true"}
                            // checked={category.isChecked}
                            type="checkbox"
                            id={`category${category.id}`}
                            onChange={() => {
                              updateCategoryIsChecked(category.id);
                            }}
                          />
                          <label htmlFor={`category${category.id}`}>
                            {category.categoryName}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* end of categories */}
          </div>
        </div>
        {/* ******************* end of left side ******************* */}

        {/*  ******************* start right side *******************  */}
        <div className="w-full h-full flex justify-center items-center my-auto">
          <div className="w-full h-full max-w-sm mx-auto justify-center bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={
                  "https://flowbite.com/docs/images/products/apple-watch.png"
                }
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  $599
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ******************* end of right side ******************* */}
      </div>
    </div>
  );
};

export default Store;
