import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://https://event-hub-wdvo.onrender.com/api/login";

  private isBrowser: boolean = typeof window !== 'undefined';

  constructor(private http:HttpClient,
                private _router :Router,
                @Inject(PLATFORM_ID) private platformId: Object) { }


                
                loginUser(user : any) {
                  return this.http.post<any>(this._loginUrl, user)
                }
              
                logoutUser() {
                  localStorage.removeItem('token')
                  this._router.navigate(['/events'])
                }
              
                getToken() : string | null {
                  if (isPlatformBrowser(this.platformId)) {
                  return localStorage.getItem('token')
                }return null; 
              }
              
                loggedIn(): boolean {
                  if (this.isBrowser) {
                    return !!localStorage.getItem('token');
                  }
                  return false;
                }
}
