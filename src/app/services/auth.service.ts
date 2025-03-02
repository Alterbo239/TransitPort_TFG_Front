import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  public logIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.logIn.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: { email: string; password: string; }): Observable<any> {
    this.logIn.next(true);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  //Guardamos el rol del usuario para usarlo con el menu.
  setRol(rol: string): void {
    localStorage.setItem('user', rol);
  }
  getRol(): string {
    return localStorage.getItem('user') || '';
  }

  logout() {
    this.logIn.next(false);
  }
}
