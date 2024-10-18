export interface Product {
  id: string;
  name: string;
  val: number;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}
