import { CartItem } from './cart-item.entity';

export class Cart {
  id: number;
  items: CartItem[];
  userId: number;
  constructor(cart:{id?:number,userId?: number, items?:CartItem[]}) {
    this.id = cart.id || 0;
    this.userId=cart.userId||0;
    this.items = cart.items || [];
  }
}
