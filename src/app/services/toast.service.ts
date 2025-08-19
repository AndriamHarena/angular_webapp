import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  showSuccess(message: string, duration: number = 3000) {
    this.addToast(message, 'success', duration);
  }

  showError(message: string, duration: number = 5000) {
    this.addToast(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 4000) {
    this.addToast(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 3000) {
    this.addToast(message, 'info', duration);
  }

  private addToast(message: string, type: Toast['type'], duration: number) {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { id, message, type, duration };
    
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
  }

  removeToast(id: string) {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(updatedToasts);
  }

  clearAll() {
    this.toastsSubject.next([]);
  }
}
