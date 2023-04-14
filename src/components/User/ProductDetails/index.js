import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/products/productSlice";

const index = (props) => {
  const products = useSelector((state) => state.products);
  console.log("products", products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h2>List of Products</h2>
      {products.loading && <div>Loading...</div>}
      {!products.loading && products.error ? (
        <div>Error: {products.error}</div>
      ) : null}
      {!products.loading && products.products.length ? (
        <ul>
          {products.products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default index;
