import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {


  constructor(
    private userService: UserService,

    ) {}

  isLoggedInn(): void{
    //console.log(("the state is:" +this.userService.getState()));
  }



}
