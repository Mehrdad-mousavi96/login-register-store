
export const OrdersService = {
    getPreviousOrders: (orders) => {
        return orders.filter((ord) => ord.isPaymentCompleted === true);
    },
    getCart: (orders) => {
        return orders.filter((ord) => ord.isPaymentCompleted === false);
    }
}

export const ProductService = {
    getProductByProductId: (products, productId) => {
        return  products.find((prod) => prod.id === productId)
    },
    fetchProducts: () => {
        return fetch(`http://127.0.0.1:5000/products`, {
          method: "GET",
        });
    }
}

export const BrandsService = {
    fetchBrands: () => {
        return fetch(`http://127.0.0.1:5000/brands`, {
            method: 'GET'
        })
    },
    getBrandByBrandId: (brands, brandId) => {
        return brands.find((brand) => (brand.id === brandId))
    }
}

export const CategoriesService = {
    fetchCategories: () => {
        return fetch(`http://127.0.0.1:5000/categories`, {
            method: 'GET'
        })
    },
    getCategoryByCategoryId: (categories, categoryId) => {
        return categories.find((category) => (category.id === categoryId))
    }
}