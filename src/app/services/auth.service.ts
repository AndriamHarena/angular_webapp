import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Inscription d'un nouvel utilisateur
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData, this.httpOptions);
  }

  /**
   * Connexion d'un utilisateur
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, this.httpOptions);
  }

  /**
   * Déconnexion (supprime le token du localStorage)
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  /**
   * Sauvegarde le token d'authentification
   */
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Récupère le token d'authentification
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== '';
  }

  /**
   * Sauvegarde les données utilisateur
   */
  saveUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Récupère les données utilisateur
   */
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
