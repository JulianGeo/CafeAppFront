import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { LogingFormComponent } from './components/forms/loging-form/loging-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'main',
    component: HomepageComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/register']))
  },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LogingFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
