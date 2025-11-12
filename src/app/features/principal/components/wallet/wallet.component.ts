import {Component, OnInit} from '@angular/core';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {User} from '../../../authentication/models/user.entity';
import {UserService} from '../../../authentication/services/user.service';



@Component({
  selector: 'app-wallet',
  imports: [
    ClassicButtonComponent,
    TranslatePipe
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

  loggedUserWallet: number = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadWalletFromLocalStorage();

    // Escuchar actualizaciones del usuario
    this.userService.userUpdated$.subscribe(() => {
      this.loadWalletFromLocalStorage(); // Refrescar el valor del saldo
    });
  }

  private loadWalletFromLocalStorage(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.loggedUserWallet = Number(user.wallet);
    }
  }


  balanceAnimated: boolean = false;
  addMoney(): void {
    this.loggedUserWallet += 100;
    this.balanceAnimated = true;
    setTimeout(() => {
      this.balanceAnimated = false;
    }, 400);

    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user: User = JSON.parse(userData);
      user.wallet = this.loggedUserWallet;

      // Guardar en base de datos
      this.userService.update(user.id, user).subscribe((updatedUser) => {
        // Opcional: actualizar el localStorage también
        localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
      });
    }
  }


}
