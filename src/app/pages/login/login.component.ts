import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router, 
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  onSubmit() {
    // Validation des champs
    if (!this.loginData.email.trim()) {
      this.toastService.showError('L\'email est requis');
      return;
    }
    
    if (!this.isValidEmail(this.loginData.email)) {
      this.toastService.showError('Format d\'email invalide');
      return;
    }
    
    if (!this.loginData.password.trim()) {
      this.toastService.showError('Le mot de passe est requis');
      return;
    }
    
    // Préparer les données pour l'API
    const loginRequest: LoginRequest = {
      email: this.loginData.email,
      password: this.loginData.password
    };

    // Appel à l'API via AuthService
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        // Sauvegarder le token et les données utilisateur
        if (response.token) {
          this.authService.saveToken(response.token);
        }
        if (response.user) {
          this.authService.saveUser(response.user);
        }
        
        this.toastService.showSuccess('Connexion réussie ! Bienvenue.');
        
        // Redirection vers home après connexion réussie
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (error) => {
        console.error('Login error:', error);
        
        if (error.status === 401) {
          this.toastService.showError('Email ou mot de passe incorrect');
        } else if (error.status === 404) {
          this.toastService.showError('Aucun compte trouvé avec cet email');
        } else if (error.status === 0) {
          this.toastService.showError('Impossible de contacter le serveur. Vérifiez votre connexion.');
        } else {
          this.toastService.showError('Erreur lors de la connexion. Réessayez plus tard.');
        }
      }
    });
  }


  goToRegister() {
    this.router.navigate(['/register']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
