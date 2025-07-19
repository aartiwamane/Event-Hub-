import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { authGuard } from './auth.guard';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { IntroductionComponent } from './introduction/introduction.component';

const routes: Routes = [

  { path: '', 
    component: IntroductionComponent },

  {
    path : 'events',
    component : EventsComponent
  },
  {
    path : 'special',
    canActivate : [authGuard],
    component : SpecialEventsComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'admission-form',
    component : AdmissionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
