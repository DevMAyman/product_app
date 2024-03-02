import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

Observable;
HttpClient;
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) this.decodeUserData();
  }
  decodeUserData() {
    let encodedData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedData));
  }
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://route-ecommerce.onrender.com/api/v1/auth/signup',
      userData
    );
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://route-ecommerce.onrender.com/api/v1/auth/signin',
      userData
    );
  }
}
