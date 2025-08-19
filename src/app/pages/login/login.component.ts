import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private toastService: ToastService) {}

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
    
    console.log('Login form submitted:', this.loginData);
    console.log('Attempting authentication for:', this.loginData.email, this.loginData.password);
    
    // Simulation d'authentification avec des comptes de test
    if (this.authenticateUser(this.loginData.email, this.loginData.password)) {
      this.toastService.showSuccess('Connexion réussie ! Bienvenue.');
      
      // Redirection vers home après connexion réussie
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    } else {
      this.toastService.showError('Email ou mot de passe incorrect');
    }
  }

  private authenticateUser(email: string, password: string): boolean {
    // Comptes de test pour la démonstration
    const testAccounts = [
      { email: 'admin@test.com', password: 'admin123' },
      { email: 'user@test.com', password: 'user123' },
      { email: 'demo@example.com', password: 'demo123' },
      { email: 'john@example.com', password: '123456' }
    ];
    
    console.log('Available test accounts:', testAccounts);
    console.log('Checking email:', email.toLowerCase());
    console.log('Checking password:', password);
    
    const found = testAccounts.find(account => 
      account.email.toLowerCase() === email.toLowerCase() && 
      account.password === password
    );
    
    console.log('Found matching account:', found);
    
    return !!found;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
