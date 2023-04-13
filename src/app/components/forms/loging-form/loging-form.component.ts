import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UsersApiService } from 'src/app/services/usersapi.service';

@Component({
  selector: 'app-loging-form',
  templateUrl: './loging-form.component.html',
  styleUrls: ['./loging-form.component.scss']
})
export class LogingFormComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private userApiService: UsersApiService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required,
        //Validator for password, at least 6 characters, at least one letter and one number
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
      });

  }


  onSubmit(): void {
    this.userService.login(this.formLogin.value)
      .then(response => {

        this.fetchUserData();
        this.router.navigate(['/main'])
      })
      .catch(error => console.log(error));
  }

  onClick(): void {
    this.userService.loginWithGoogle()
      .then(response => {

        let user: User = {
          name: response.user.displayName ?
            response.user.displayName : "user logged with google",
          email: response.user.email ?
            response.user.email : "user logged with google"
        }

        localStorage.setItem('items', JSON.stringify([]));
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/main']);

      })
      .catch(error => console.log(error))
  }

}
