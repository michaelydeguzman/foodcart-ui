import axios from "axios";
import { useEffect, useState } from "react";
import { Cart } from "./types";
import "./styles/FoodCart.css";
interface FoodCartProps {
  cart: Cart | null;
}
const FoodCart = (props: FoodCartProps) => {
  const { cart } = props;

  return (
    <div className="container">
      <div className="title">Cart</div>
      <div className="cartItemContainer">
        {cart?.items.map((item, index) => {
          const { product, quantity, totalPrice } = item;
          return (
            <div key={`cartItem_${index}`} className="cartItem">
              <span>{product.name}</span>
              <span>{`(${quantity})`}</span>
              <span>=</span>
              <span>{totalPrice}</span>
            </div>
          );
        })}
      </div>

      <div>
        <span>Total:</span>
        <span>{cart?.total}</span>
      </div>
    </div>
  );
};

export default FoodCart;
