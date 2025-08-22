import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router, 
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  onSubmit() {
    // Validation des champs
    if (!this.registerData.name.trim()) {
      this.toastService.showError('Le nom est requis');
      return;
    }
    
    if (!this.registerData.email.trim()) {
      this.toastService.showError('L\'email est requis');
      return;
    }
    
    if (!this.isValidEmail(this.registerData.email)) {
      this.toastService.showError('Format d\'email invalide');
      return;
    }
    
    if (this.registerData.password.length < 6) {
      this.toastService.showError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.toastService.showError('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Préparer les données pour l'API
    const registerRequest: RegisterRequest = {
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password,
      confirmPassword: this.registerData.confirmPassword
    };

    // Appel à l'API via AuthService
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        
        // Sauvegarder le token et les données utilisateur via AuthService
        if (response.token && response.user) {
          this.authService.saveToken(response.token);
          this.authService.saveUser(response.user);
        }
        
        this.toastService.showSuccess('Inscription réussie ! Redirection vers votre profil...');
        
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1500);
      },
      error: (error) => {
        console.error('Registration error:', error);
        
        if (error.status === 400) {
          this.toastService.showError('Données invalides. Vérifiez vos informations.');
        } else if (error.status === 409) {
          this.toastService.showError('Un compte avec cet email existe déjà.');
        } else if (error.status === 0) {
          this.toastService.showError('Impossible de contacter le serveur. Vérifiez votre connexion.');
        } else {
          this.toastService.showError('Erreur lors de l\'inscription. Réessayez plus tard.');
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  isPasswordMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
