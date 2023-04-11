import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { UserService } from 'src/app/services/user.service';
import { UsersApiService } from 'src/app/services/usersapi.service';

@Component({
  selector: 'app-loging-form',
  templateUrl: './loging-form.component.html',
  styleUrls: ['./loging-form.component.scss']
})
export class LogingFormComponent implements OnInit{

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private userApiService: UsersApiService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required,
          //Validator for password, at least 5 characters, at least one letter and one number
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')])
    })
  }

  ngOnInit(): void {
  }


  fetchUserData(): void {
    this.userApiService.getByEmail(this.formLogin.value.email)
    .subscribe(user => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('items', JSON.stringify([]));
        let order:Order = {
          user: user,
        }
        localStorage.setItem('order', JSON.stringify(order));
        //this.router.navigate(['/home']);
      });

  }


  onSubmit(): void {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response)
        this.fetchUserData();
        this.router.navigate(['/main'])
      })
      .catch(error => console.log(error));
  }

  onClick(): void {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  }

}
