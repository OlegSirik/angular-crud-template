import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private cfg: any;

  load(): Promise<void> {
    return fetch('/assets/config.json')
      .then(r => r.json())
      .then(j => this.cfg = j);
  }

  get apiUrl(): string { return this.cfg?.apiUrl; }
  get defaultTenant(): string { return this.cfg?.defaultTenant; }
  get defaultClient(): string { return this.cfg?.defaultClient; }
}
