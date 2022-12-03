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
        });

      setProducts(productsResponseBody);
    })();
  }, []);

  return (
    <div>
      <div>
        <h1>{products.length}</h1>
        <div>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="search"
            className="border border-slate-900 focus:outline-none rounded-md text-center"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
