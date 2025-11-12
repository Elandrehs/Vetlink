export class CartItem {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;

  constructor(cartItem: {id?: number, name?: string, unitPrice?: number, quantity?: number}) {
    this.id = cartItem.id || 0;
    this.name = cartItem.name || '';
    this.unitPrice = cartItem.unitPrice || 0;
    this.quantity = cartItem.quantity || 1;
  }
}
