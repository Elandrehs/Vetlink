import { Component, inject, OnInit} from '@angular/core';
import {AddProductButtonComponent} from '../../../../shared/components/buttons/add-product-button/add-product-button.component';
import {ProductFormModalComponent} from '../product-form-modal/product-form-modal.component';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../models/product.entity';
import {ProductService} from '../../services/product.service';
import {TranslatePipe} from '@ngx-translate/core';
import {CartItem} from '../../models/cart-item.entity';
import {CartService} from '../../services/cart.service';
import {Cart} from '../../models/cart.entity';

@Component({
  selector: 'app-products-list',
  imports: [
    AddProductButtonComponent,
    ProductFormModalComponent,
    NgIf,
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  protected showModal: boolean = false;

  protected productData!:Product;

  protected editMode:boolean = false;

  private productService:ProductService =inject(ProductService);

  private cartService:CartService =inject(CartService);

  protected products: Product[] = [];

  categoryIcons: { [key: string]: string } = {
    'food': '/img/food-icon.png',
    'hygiene': '/img/hygiene-icon.png',
    'toys': '/img/toys-icon.png',
    'medicine': '/img/medicine-icon.png',
    'accessories': '/img/accessories-icon.png',
    'clothes': '/img/clothes-icon.png',
  };

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || '/img/vetlink-logo.png';
  }

  constructor() {
    this.editMode = false;
    this.productData= new Product({});
    console.log(this.productData);
  }

  loggedUserId: number = 0;

  userCartId: number = 0;

  ngOnInit(): void {
    this.getAllProducts();

    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.loggedUserId = user.id;

      this.cartService.getCartByUserId(this.loggedUserId).subscribe((cart: Cart | null) => {
        if (cart) {
          this.userCartId = cart.id;
        } else {
          const newCart = new Cart({ userId: this.loggedUserId, items: [] });
          this.cartService.create(newCart).subscribe((createdCart: Cart) => {
            this.userCartId = createdCart.id;
          });
        }
      });
    }
  }


  protected onEditItem(item:Product){
    this.editMode = true;
    this.productData= item;
    this.showModal = true;
  }

  protected onDeleteItem(item: Product): void {
    this.deleteProduct(item.id);
  }

  protected onCancelRequested(){
    this.resetEditState();
    this.showModal = false;
    this.getAllProducts();
  }

  protected onProductAddRequested(item:Product){
    this.productData= item;
    this.createProduct();
    this.resetEditState();
    this.showModal = false;
  }

  protected onProductUpdateRequested(item:Product){
    this.productData= item;
    this.updateProduct();
    this.resetEditState();
    this.showModal = false;
  }

  private resetEditState():void{
    this.productData= new Product({});
    this.editMode = false;
  }

  private getAllProducts(){
    this.productService.getAll().subscribe((response:Array<Product>) => {
      this.products=response;
    })
  }
  private createProduct(){
    this.productService.create(this.productData).subscribe((response: Product) => {
      this.products.push(response);
    });
  }

  private updateProduct(): void {
    const productToUpdate = this.productData;
    this.productService.update(productToUpdate.id, productToUpdate).subscribe((updated: Product) => {
      const index = this.products.findIndex((product) => product.id === updated.id);
      if (index !== -1) {
        this.products[index] = updated;
      }
    });
  }

  private deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  addToCart(product: Product): void {
    const cartItem = new CartItem({
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: 1
    });

    this.cartService.getById(this.userCartId).subscribe((cart: Cart) => {
      cart.items.push(cartItem);
      this.cartService.update(this.userCartId, cart).subscribe(() => {
        console.log('Producto agregado al carrito');
        this.cartService.notifyCartUpdated(); // <--- ESTA LÍNEA NUEVA
      });

    });
  }





}

