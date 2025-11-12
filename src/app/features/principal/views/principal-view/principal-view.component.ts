import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WalletComponent} from '../../components/wallet/wallet.component';
import {ProductsListComponent} from '../../components/products-list/products-list.component';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {PurchaseHistoryComponent} from '../../components/purchase-history/purchase-history.component';
import {LanguageSwitcherComponent} from '../../../../shared/components/language-switcher/language-switcher.component';
import {User} from '../../../authentication/models/user.entity';
import { Router } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-principal.view',
  imports: [
    WalletComponent,
    ProductsListComponent,
    ShoppingCartComponent,
    PurchaseHistoryComponent,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PrincipalViewComponent  implements OnInit {

  constructor(private router: Router) { }

  loggedUserName: string = '';
  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.loggedUserName = user.name;
    }
  }
  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/authentication'); // o a tu ruta de login
  }

}
