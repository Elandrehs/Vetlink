import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { Purchase } from '../../models/purchase.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  imports: [
    TranslatePipe,
    NgForOf
  ],
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: Purchase[] = [];
  purchase!: Purchase;

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.fetchPurchases(user.id);
      this.purchaseService.purchaseCreated$.subscribe(() => {
        this.fetchPurchases(user.id); // Se actualiza cuando se cree una nueva compra
      });
    }
  }

  constructor(private purchaseService: PurchaseService) {}

  fetchPurchases(userId: number): void {
    this.purchaseService.getByUserId(userId).subscribe((purchases: Purchase[]) => {
      this.purchases = purchases.filter(p => p.userId === userId);
      console.log('Compras del usuario:', this.purchases);
    });
  }



  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // ej: "18/05/2025"
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(); // ej: "19:36:02"
  }

}
