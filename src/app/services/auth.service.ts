import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  public logIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.logIn.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: { email: string; password: string; }): Observable<any> {
    this.logIn.next(true);
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  getUserID(): number | null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    try {
      const user = JSON.parse(userData);
      return user.id;
    } catch (error) {
      console.error('No hay datos que parsear...', error);
      return null;
    }
  }

  //Guardamos el rol del usuario para usarlo con el menu.
  getRol(): string |null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    const user = JSON.parse(userData);
    return user.cargo;
  }

  logout() {
    this.logIn.next(false);
  }
}
