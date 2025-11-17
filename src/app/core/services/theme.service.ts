import { Injectable } from '@angular/core';

export type ThemeName = 'standard' | 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'app_theme';

  setTheme(theme: ThemeName) {
    document.body.classList.remove('theme-standard','theme-light','theme-dark');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem(this.key, theme);
  }

  load() {
    const t = (localStorage.getItem(this.key) as ThemeName) || 'standard';
    this.setTheme(t);
  }
}
