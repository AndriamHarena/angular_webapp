import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

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

  constructor(private router: Router, private toastService: ToastService) {}

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
    
    console.log('Register form submitted:', this.registerData);
    this.toastService.showSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
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
