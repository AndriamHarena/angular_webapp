import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    // Vérifier si un thème est déjà sauvegardé
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = savedTheme === 'true';
      this.setDarkMode(isDark);
    } else {
      // Détecter la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode.value);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    localStorage.setItem('darkMode', isDark.toString());
    
    // Appliquer la classe au body
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}
