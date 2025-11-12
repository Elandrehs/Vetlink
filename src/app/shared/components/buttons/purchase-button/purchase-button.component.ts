import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-purchase-button',
  imports: [
    TranslatePipe
  ],
  templateUrl: './purchase-button.component.html',
  styleUrl: './purchase-button.component.css'
})
export class PurchaseButtonComponent {

}
