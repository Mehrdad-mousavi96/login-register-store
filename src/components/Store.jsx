import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext";
import Product from "./Product";
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

          // add isordered to product
          product.isOrdered = false;
        });

      setProducts(productsResponseBody);
    })();
    document.title = "Store";
  }, []);


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

        {/* start right side */}
        <div className="flex flex-wrap w-full items-center justify-center">
          {products.map((product) => (
            <div className="p-4">
              <Product product={product} />
            </div>
          ))}
        </div>
        {/* end of right side */}
      </div>
    </div>
  );
};

export default Store;
