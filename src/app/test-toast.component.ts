import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-test-toast',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div style="padding: 2rem;">
      <h1>Test des Toasts</h1>
      <button (click)="testError()" style="margin: 0.5rem; padding: 1rem; background: red; color: white; border: none; cursor: pointer;">
        Test Toast Erreur
      </button>
      <button (click)="testSuccess()" style="margin: 0.5rem; padding: 1rem; background: green; color: white; border: none; cursor: pointer;">
        Test Toast Succès
      </button>
      <button (click)="testWarning()" style="margin: 0.5rem; padding: 1rem; background: orange; color: white; border: none; cursor: pointer;">
        Test Toast Warning
      </button>
      <button (click)="testInfo()" style="margin: 0.5rem; padding: 1rem; background: blue; color: white; border: none; cursor: pointer;">
        Test Toast Info
      </button>
    </div>
    <app-toast></app-toast>
  `
})
export class TestToastComponent {
  constructor(private toastService: ToastService) {}

  testError() {
    this.toastService.showError('Ceci est un message d\'erreur de test !');
  }

  testSuccess() {
    this.toastService.showSuccess('Ceci est un message de succès de test !');
  }

  testWarning() {
    this.toastService.showWarning('Ceci est un message d\'avertissement de test !');
  }

  testInfo() {
    this.toastService.showInfo('Ceci est un message d\'information de test !');
  }
}
