import axios from "axios";
import { useEffect, useState } from "react";
import { Cart } from "./types";

interface FoodCartProps {
  cart: Cart | null;
}
const FoodCart = (props: FoodCartProps) => {
  const { cart } = props;

  return (
    <div className="flex flex-col">
      <div>Cart</div>
      {cart?.items.map((item, index) => {
        const { product, quantity, totalPrice } = item;
        return (
          <div key={`cartItem_${index}`} className="flex">
            <span>{product.name}</span>
            <span>{`(${quantity})`}</span>
            <span>=</span>
            <span>{totalPrice}</span>
          </div>
        );
      })}

      <div>
        <span>Total:</span>
        <span>{cart?.total}</span>
      </div>
    </div>
  );
};

export default FoodCart;
