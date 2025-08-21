import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isEditing: boolean = false;
  isLoading: boolean = false;
  editData: any = {
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

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
    this.isEditing = true;
    // Pré-remplir le formulaire avec les données actuelles
    this.editData = {
      name: this.user.name,
      email: this.user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  cancelEdit() {
    this.isEditing = false;
    this.editData = {
      name: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  saveProfile(form: any) {
    if (form.invalid) {
      this.toastService.showError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (this.editData.newPassword && this.editData.newPassword !== this.editData.confirmPassword) {
      this.toastService.showError('Les mots de passe ne correspondent pas');
      return;
    }

    this.isLoading = true;

    // Préparer les données à envoyer
    const updateData: any = {
      name: this.editData.name,
      email: this.editData.email
    };

    // Ajouter les données de mot de passe si nécessaire
    if (this.editData.newPassword) {
      if (!this.editData.currentPassword) {
        this.toastService.showError('Veuillez saisir votre mot de passe actuel');
        this.isLoading = false;
        return;
      }
      updateData.currentPassword = this.editData.currentPassword;
      updateData.newPassword = this.editData.newPassword;
    }

    // Appeler le service d'authentification
    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Profil mis à jour avec succès');
        // Mettre à jour les données utilisateur locales
        this.user = { ...this.user, name: updateData.name, email: updateData.email };
        this.authService.updateUserData(this.user);
        this.isEditing = false;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.showError(error.error?.message || 'Erreur lors de la mise à jour du profil');
        this.isLoading = false;
      }
    });
  }

  deleteAccount() {
    const confirmDelete = confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );
    
    if (confirmDelete) {
      this.isLoading = true;
      
      this.authService.deleteAccount().subscribe({
        next: (response) => {
          this.toastService.showSuccess('Compte supprimé avec succès');
          // Déconnecter l'utilisateur et rediriger
          this.authService.logout();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastService.showError(error.error?.message || 'Erreur lors de la suppression du compte');
          this.isLoading = false;
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.toastService.showSuccess('Déconnexion réussie');
    this.router.navigate(['/home']);
  }
}
