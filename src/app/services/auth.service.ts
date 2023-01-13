import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loginUrl = "auth/"
  baseUrl = environment.api;
  apiUrl = encodeURI(this.baseUrl + this.loginUrl);

  constructor(private http: HttpClient, private router: Router) { }

  auth(email: string, password: string): Observable<User> {
    
    return this.http.post<User>(this.apiUrl + "login", {email, password});
  }

  subscribe(email: string, password: string): Observable<User> {
    
    return this.http.post<User>(this.apiUrl + "subscribe", {email, password});
  }

  isAuthenticated(): boolean {
    let auth: boolean = JSON.parse(sessionStorage.getItem('user')!);

    if (auth){
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }
}
