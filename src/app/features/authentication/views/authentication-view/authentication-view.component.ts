import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {
  AddProductButtonComponent
} from '../../../../shared/components/buttons/add-product-button/add-product-button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcherComponent} from '../../../../shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-authentication-view',
  imports: [
    RouterOutlet,
    RouterLink,
    AddProductButtonComponent,
    TranslatePipe,
    LanguageSwitcherComponent
  ],
  templateUrl: './authentication-view.component.html',
  styleUrl: './authentication-view.component.css'
})
export class AuthenticationViewComponent {

}
