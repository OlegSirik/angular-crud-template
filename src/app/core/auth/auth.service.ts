import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly TENANT_KEY = 'tenant_id';
  private readonly CLIENT_KEY = 'client_id';
  private readonly ACCOUNT_KEY = 'account_id';

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<any> {
    // Replace with real API call
    return of({ token: 'demo-token', accountId: 'acc-1' }).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.ACCOUNT_KEY, res.accountId);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  get token(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  get tenant(): string | null { return localStorage.getItem(this.TENANT_KEY); }
  get client(): string | null { return localStorage.getItem(this.CLIENT_KEY); }
  get accountId(): string | null { return localStorage.getItem(this.ACCOUNT_KEY); }

  setTenant(id: string) { localStorage.setItem(this.TENANT_KEY, id); }
  setClient(id: string) { localStorage.setItem(this.CLIENT_KEY, id); }

  isLogged(): boolean { return !!this.token; }
}
