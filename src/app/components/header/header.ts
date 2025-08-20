import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentUser: any = null;
  private routerSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
    
    // Écouter les changements de route pour mettre à jour l'état d'authentification
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthStatus();
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
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
