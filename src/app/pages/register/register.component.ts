import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AuthService, RegisterRequest } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    firstName: '',
    lastName: '',
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
    if (!this.registerData.firstName.trim()) {
      this.toastService.showError('Le prénom est requis');
      return;
    }
    
    if (!this.registerData.lastName.trim()) {
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
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      email: this.registerData.email,
      password: this.registerData.password
    };

    // Appel à l'API via AuthService
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.toastService.showSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
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
