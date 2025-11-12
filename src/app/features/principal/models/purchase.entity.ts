// models/purchase-history.entity.ts
export class Purchase {
  id: number;
  userId: number;
  totalSpent: number;
  date: string;

  constructor(purchase: { id?: number, userId: number, totalSpent: number, date?: string }) {
    this.id = purchase.id || 0;
    this.userId = purchase.userId;
    this.totalSpent = purchase.totalSpent;
    this.date = purchase.date ?? new Date().toISOString();
  }
}
