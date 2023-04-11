import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LogingFormComponent } from './components/forms/loging-form/loging-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { ItemComponent } from './components/items/item/item.component';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { ItemListContainerComponent } from './components/items/item-list-container/item-list-container.component';
import { MatTabNav } from '@angular/material/tabs';
import { UserService } from './services/user.service';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    AuthenticationComponent,
    HomepageComponent,
    NotFoundComponent,
    LogingFormComponent,
    RegisterFormComponent,
    NavbarComponent,
    MainFooterComponent,
    BannerComponent,
    ItemComponent,
    ItemListComponent,
    ItemListContainerComponent,
    ShoppingCartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [MatTabNav, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
