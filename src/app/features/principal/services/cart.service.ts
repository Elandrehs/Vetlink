import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { Cart } from '../models/cart.entity';
import {BehaviorSubject, catchError, map, Observable, Subject, tap} from 'rxjs';

const cartResourceEndpointPath = environment.cartEndpointPath;



@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService<Cart> {
  private cartSubject = new BehaviorSubject<Cart>(new Cart({ id: 1, items: [] }));

  private cartUpdatedSource = new Subject<void>();
  cartUpdated$ = this.cartUpdatedSource.asObservable();

  notifyCartUpdated(): void {
    this.cartUpdatedSource.next();
  }

  constructor() {
    super();
    this.resourceEndpoint = cartResourceEndpointPath;
  }

  override getById(id: number): Observable<Cart> {
    return super.getById(id).pipe(
      tap(cart => this.cartSubject.next(cart))  // emite al BehaviorSubject
    );
  }

  override update(id: number, cart: Cart): Observable<Cart> {
    return super.update(id, cart).pipe(
      tap(updatedCart => this.cartSubject.next(updatedCart))  // emite al actualizar
    );
  }

  getCartByUserId(userId: number): Observable<Cart | null> {
    return this.http.get<Cart[]>(`${this.resourcePath()}?userId=${userId}`).pipe(
      map((carts) => carts.length > 0 ? carts[0] : null),
      catchError(this.handleError)
    );
  }


}
