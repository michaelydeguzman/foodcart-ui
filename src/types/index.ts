export type Product = {
  id: string;
  name: string;
  price: number;
};

export type MenuItem = Product & {
  quantity: number | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
  totalPrice: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};
