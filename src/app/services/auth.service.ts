import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../interfaces/auth.interface';
import { API_ENDPOINTS } from '../constants/api.constants';
import { UserContextService } from './user-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = API_ENDPOINTS.BASE_URL + '/api/auth';
  private userApiUrl = API_ENDPOINTS.BASE_URL + '/api/users'; 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private userContextService: UserContextService
  ) { }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/register`, userData, this.httpOptions);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`, credentials, this.httpOptions);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userContextService.clearUser();
  }

  updateProfile(updateData: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/profile`, updateData, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

  updateUserData(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/account`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken() || localStorage.getItem('token');
    return token !== null && token !== '';
  }

  saveUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userContextService.setUser(user);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser') || localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  initializeUserContext(): void {
    const user = this.getCurrentUser();
    if (user && this.isAuthenticated()) {
      this.userContextService.setUser(user);
    }
  }
}
