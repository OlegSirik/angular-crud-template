import { Injectable } from '@angular/core';
import { BaseApiService } from '../../shared/services/base-api.service';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private api: BaseApiService) {}
  list(): Observable<User[]> { return this.api.get<User[]>('/users'); }
  get(id: string) { return this.api.get<User>(`/users/${id}`); }
  create(u: User) { return this.api.post<User>('/users', u); }
  update(id: string, u: Partial<User>) { return this.api.put<User>(`/users/${id}`, u); }
  delete(id: string) { return this.api.delete(`/users/${id}`); }
}
