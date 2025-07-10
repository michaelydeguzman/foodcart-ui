import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { MenuItem, Product } from "./types";

interface MenuProps {
  refetchCart: () => void;
  products: Product[];
}

const Menu = (props: MenuProps) => {
  const { products } = props;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setupMenu(products);
  }, [products]);

  const setupMenu = (products: Product[]) => {
    setMenuItems(() => {
      let _menuItems: MenuItem[] = [];

      _menuItems = products.map((product) => {
        return {
          ...product,
          quantity: null,
        } as MenuItem;
      });

      return _menuItems;
    });
  };

  const handleUpdateQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;

    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleResetMenuItemQuantity = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: null } : item))
    );
  };

  const handleAddClick = async (id: string): Promise<void> => {
    try {
      await axios.post("http://localhost:5150/api/FoodCart", {
        productId: id,
        quantity: menuItems.find((x) => x.id === id)?.quantity,
      });

      alert("Added to cart!");

      handleResetMenuItemQuantity(id);

      if (props.refetchCart) {
        props.refetchCart();
      }
    } catch (error) {
      console.error("failed to add product to cart.", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>Menu</div>
      {menuItems.map((menuItem, index) => {
        return (
          <div key={`product_${index}`} className="flex gap-2">
            <span>{menuItem.name}</span>
            <span>{`$ ${menuItem.price}`}</span>
            <input
              value={menuItem.quantity ?? ""}
              onChange={(e) => handleUpdateQuantity(e, menuItem.id)}
            />
            <button onClick={() => handleAddClick(menuItem.id)}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
