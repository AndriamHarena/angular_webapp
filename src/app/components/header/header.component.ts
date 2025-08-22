import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserContextService, User } from '../../services/user-context.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentUser: User | null = null;
  private routerSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userContextService: UserContextService
  ) {}

  ngOnInit() {
    // Écouter les changements d'utilisateur depuis le contexte
    this.userSubscription = this.userContextService.user$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = user !== null;
    });
    
    // Écouter les changements de route pour mettre à jour l'état d'authentification
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthStatus();
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.currentUser = this.authService.getCurrentUser();
    } else {
      this.currentUser = null;
    }
  }
}
