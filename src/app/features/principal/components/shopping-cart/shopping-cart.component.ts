import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PurchaseButtonComponent } from '../../../../shared/components/buttons/purchase-button/purchase-button.component';
import { Cart } from '../../models/cart.entity';
import { CartItem } from '../../models/cart-item.entity';
import { CartService } from '../../services/cart.service';
import {NgForOf} from '@angular/common';
import {Purchase} from '../../models/purchase.entity';
import {PurchaseService} from '../../services/purchase.service';
import {UserService} from '../../../authentication/services/user.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    PurchaseButtonComponent,
    TranslatePipe,
    NgForOf
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  cart!: Cart;
  userId:number=0;

  constructor(
    private cartService: CartService,
    private purchaseService: PurchaseService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {

    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.loadCart(this.userId); // Método separado para reutilizar

      this.cartService.cartUpdated$.subscribe(() => {
        this.loadCart(this.userId); // Recargar carrito cuando se actualiza
      });

      this.cartService.getCartByUserId(this.userId).subscribe((cart: Cart | null) => {
        if (cart) {
          this.cart = cart;
        } else {
          const newCart = new Cart({  userId: this.userId, items: [] });
          this.cartService.create(newCart).subscribe((createdCart: Cart) => {
            this.cart = createdCart;
          });
        }
      });
    }
  }


  get totalCost(): number {
    return this.cart.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity),0, );
  }

  increaseQuantity(item: CartItem): void {
    item.quantity += 1;
    this.updateCart();
  }

  decreaseQuantity(item: CartItem): void {
    const index = this.cart.items.findIndex(i => i.id === item.id);

    if (index !== -1) {
      if (this.cart.items[index].quantity > 1) {
        this.cart.items[index].quantity -= 1;
      } else {
        // Eliminar el item si la cantidad llega a 0
        this.cart.items.splice(index, 1);
      }

      this.updateCart();
    }
  }
  private updateCart(): void {
    this.cartService.update(this.cart.id, this.cart).subscribe();
  }

  private loadCart(userId: number): void {
    this.cartService.getCartByUserId(userId).subscribe((cart: Cart | null) => {
      if (cart) {
        this.cart = cart;
      }
    });
  }
  buyNow(): void {
    if (!this.cart.items || this.cart.items.length === 0) {
      console.warn('No se puede realizar la compra: el carrito está vacío.');
      return;
    }

    const userData = localStorage.getItem('loggedUser');
    if (!userData) return;

    const user = JSON.parse(userData);
    if (user.wallet < this.totalCost) {
      alert('Saldo insuficiente en la billetera.');
      return;
    }

    const newPurchase = new Purchase({
      userId: this.userId,
      totalSpent: this.totalCost
    });

    this.purchaseService.create(newPurchase).subscribe(() => {
      console.log('Compra registrada');
      this.purchaseService.notifyPurchaseCreated(); // Notificar a historial

      // Descontar saldo de la billetera
      const updatedUser = { ...user, wallet: user.wallet - this.totalCost };

      this.userService.update(user.id, updatedUser).subscribe(() => {
        localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
        this.userService.notifyUserUpdated(); // Notifica actualización de billetera

        // Vaciar carrito
        this.cart.items = [];
        this.cartService.update(this.cart.id, this.cart).subscribe(() => {
          this.cartService.notifyCartUpdated();
        });
      });
    });
  }

}
