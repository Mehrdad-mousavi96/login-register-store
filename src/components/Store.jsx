import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext";
import Product from "./Product";
import { BrandsService, CategoriesService, ProductService } from "./Service";

const Store = () => {
  const userContext = useContext(UserContext);

  // states
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productToShow, setProductToShow] = useState([]);
  const [search, setSearch] = useState([]);

  // fetching all stuffs
  useEffect(() => {
    (async () => {
      // fetch Brands
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();
      brandsResponseBody.forEach((brand) => {
        brand.isChecked = false;
      });
      setBrands(brandsResponseBody);

      // fetch Categories
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();
      categoriesResponseBody.forEach((category) => {
        category.isChecked = false;
      });
      setCategories(categoriesResponseBody);

      // fetch Products
      let productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}`,
        {
          method: "GET",
        }
      );
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
      setProductToShow(productsResponseBody);
    })();
    document.title = "Store";
  }, [search]);

  // updateBrandIsChecked function //
  const updateBrandIsChecked = (id) => {
    let brandsData = brands.map((brand) => {
      brand.id === id && (brand.isChecked = !brand.isChecked);
      return brand;
    });
    setBrands(brandsData);
    updateProductToShow();
  };

  // updateCategoryIsChecked function //
  const updateCategoryIsChecked = (id) => {
    let categoriesData = categories.map((category) => {
      category.id === id && (category.isChecked = !category.isChecked);
      return category;
    });
    setCategories(categoriesData);
    updateProductToShow();
  };

  const onAddToCartClick = (propProduct) => {
    (async () => {
      let newOrder = {
        userId: userContext.user.currentUserId,
        productId: propProduct.id,
        quantity: 1,
        isPaymentCompleted: false,
      };

      let orderResponse = await fetch(`http://localhost:5000/orders`, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: { "Content-type": "application/json" },
      });

      if (orderResponse.ok) {
        let orderResponseBody = await orderResponse.json();
        let prods = products.map((p) => {
          if (p.id === propProduct.id) p.isOrdered = true;
          return p;
        });
        setProducts(prods);
        updateProductToShow();
      } else {
        console.log(orderResponse);
      }
    })();
  };

  // show products filter //
  const updateProductToShow = () => {
    setProductToShow(
      products
        .filter((prod) => {
          return (
            categories.filter(
              (cat) => cat.id === prod.categoryId && cat.isChecked
            ).length > 0
          );
        })
        .filter((prod) => {
          return (
            brands.filter(
              (brand) => brand.id === prod.brandId && brand.isChecked
            ).length > 0
          );
        })
    );
  };

  // JSX RETURN
  return (
    <div>
      <div className="flex">
        {/* ******************* start left side ******************* */}
        <div>
          <div className="flex flex-col w-full h-screen">
            {/* start headers */}
            <div className="w-full px-4 flex flex-col items-center justify-center h-1/5">
              <p className="text-md">
                <b className="underline text-lg">{productToShow.length}</b>{" "}
                Products are showing
              </p>
              <input
                className="border border-slate-900 px-2 my-4 focus:outline-none rounded-md"
                placeholder="search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                autoFocus
                name=""
                id=""
              />
            </div>
            {/* end of headers */}

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
                            checked={category.isChecked}
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
                        checked={brand.isChecked}
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
          </div>
        </div>
        {/* ******************* end of left side ******************* */}

        {/* start right side */}
        <div className="flex flex-wrap w-full items-center justify-center">
          {productToShow.map((product) => (
            <div key={product.id} className="p-4">
              <Product
                key={product.id}
                product={product}
                onAddToCartClick={onAddToCartClick}
              />
            </div>
          ))}
        </div>
        {/* end of right side */}
      </div>
    </div>
  );
};

export default Store;
