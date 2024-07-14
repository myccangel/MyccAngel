import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(userRegister: UserRegister): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register/users`, userRegister);
  }

  recoverEmailPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/recover-password`, { email });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { email, password });
  }
}
