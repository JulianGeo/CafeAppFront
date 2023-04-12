import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { LogingFormComponent } from './components/forms/loging-form/loging-form.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ItemListContainerComponent } from './components/items/item-list-container/item-list-container.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main'
  },

  {
    path: 'main',
    component: HomepageComponent,
  },

  {
    path: 'main',

    children: [
      {
        path: 'items',
        component: ItemListContainerComponent
      },
      {
        path: 'places',
        component: NotFoundComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: 'login',
    component: LogingFormComponent
  },
  {
    path: 'shoppingcart',
    component: ShoppingCartComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
/*   {
    path: 'items',
    component: ItemListContainerComponent
  },
  {
    path: 'places',
    component: LogingFormComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  }, */
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
