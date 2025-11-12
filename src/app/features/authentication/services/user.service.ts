import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';
import {User} from '../models/user.entity';
import {Subject} from 'rxjs';

const usersResourceEndpointPath = environment.usersEndpointPath;


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  private userUpdatedSource = new Subject<void>();
  userUpdated$ = this.userUpdatedSource.asObservable(); // ✅ Esto ya lo tienes
  constructor() {
    super();
    this.resourceEndpoint=usersResourceEndpointPath;
  }
  notifyUserUpdated(): void {
    this.userUpdatedSource.next();
  }
}
