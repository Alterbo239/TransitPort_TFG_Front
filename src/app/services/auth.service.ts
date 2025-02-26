import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  //Guardamos el rol del usuario para usarlo con el menu.
  setRol(rol: string): void {
    localStorage.setItem('cargo', rol);
  }
  getRol(): string {
    return localStorage.getItem('cargo') || '';
  }

  logout(){
    this.logIn.next(false);
  }
}
