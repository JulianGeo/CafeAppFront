import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  haveAccount: boolean = true;

  constructor(
    ) {}
    haveAnAccount(): void{
    this.haveAccount = !this.haveAccount;
  }



}
