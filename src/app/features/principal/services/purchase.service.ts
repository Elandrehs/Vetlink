import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../models/purchase.entity';
import {catchError, Observable, retry, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';

const purchasesResourceEndpointPath=environment.purchasesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends BaseService<Purchase>{

  constructor() {
    super();
    this.resourceEndpoint=purchasesResourceEndpointPath;
  }
  getByUserId(userId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${environment.serverBaseUrl}${this.resourceEndpoint}?userId=${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  private purchaseCreatedSource = new Subject<void>();
  purchaseCreated$ = this.purchaseCreatedSource.asObservable();

  notifyPurchaseCreated(): void {
    this.purchaseCreatedSource.next();
  }

}
