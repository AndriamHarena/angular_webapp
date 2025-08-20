import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Récupérer les données utilisateur
    this.user = this.authService.getCurrentUser();
  }

  editProfile() {
    this.toastService.showInfo('Fonctionnalité de modification du profil à venir');
    // TODO: Implémenter la page d'édition du profil
  }

  deleteAccount() {
    const confirmDelete = confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );
    
    if (confirmDelete) {
      // TODO: Implémenter l'API de suppression de compte
      this.toastService.showError('Fonctionnalité de suppression de compte à venir');
    }
  }

  logout() {
    this.authService.logout();
    this.toastService.showSuccess('Déconnexion réussie');
    this.router.navigate(['/home']);
  }
}
