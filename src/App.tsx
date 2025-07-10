import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import FoodCart from "./FoodCart";
import Menu from "./Menu";
import { Cart, Product } from "./types";
import axios from "axios";

function App() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCartAsync = async (): Promise<void> => {
    try {
      const response = await axios.get<any>(
        "http://localhost:5150/api/FoodCart"
      );
      setCart(response.data as Cart);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const fetchProductsAsync = async (): Promise<void> => {
    try {
      const response = await axios.get<any>(
        "http://localhost:5150/api/Product"
      );

      const products = response.data as Product[];

      setProducts(products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchData = () => {
    fetchCartAsync();
    fetchProductsAsync();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-10 items-center">
      <Menu products={products} refetchCart={fetchCartAsync} />
      <FoodCart cart={cart} />
    </div>
  );
}

export default App;
