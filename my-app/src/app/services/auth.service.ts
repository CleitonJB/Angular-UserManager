import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = {};

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(usuario: User){
    return this.http.post('http://localhost:3000/auth/register', usuario)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id);
        this.currentUser = res;
        this.router.navigate(['perfil/' + res.user._id]);
      });
  }

  login(usuario: User){
    return this.http.post('http://localhost:3000/auth/authenticate', usuario)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id);
        this.currentUser = res;
        this.router.navigate(['perfil/' + res.user._id]);
      });
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout(){
    let rmvToken = localStorage.removeItem('access_token');
    if(rmvToken == null){
      this.router.navigate(['login'])
    }
  }

  getUserProfile(id){
    return this.http.get(`http://localhost:3000/auth/user/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      })
    );
  }
}
