import { CanActivateFn } from '@angular/router';
import { CanActivate , Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
