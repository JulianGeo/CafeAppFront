import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UsersApiService } from 'src/app/services/usersapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {


  formReg: FormGroup;
  formRegPersonalInfo: FormGroup;
  user: User | undefined;


  constructor(
    private userService: UserService,
    private userApiService: UsersApiService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required,
        //Validator for password, at least 5 characters, at least one letter and one number
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')])
    });

    this.formRegPersonalInfo = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      idNum: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
    })

  }



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.userApiPost(response);
        //alert(`User with email: ${response.user.email} has been created in the firebase DB`)
      })
      .catch(error => console.log(error));
  }

  isFormsInvalid() {
    return this.formReg.invalid || this.formRegPersonalInfo.invalid;
  }

  userInitialization(): User {
    var userLoginInfo = this.formReg.value;
    var userPersonalInfo = this.formRegPersonalInfo.value;

    this.user = {
      idNum: userPersonalInfo.idNum,
      name: userPersonalInfo.name,
      lastname: userPersonalInfo.lastname,
      email: userLoginInfo.email,
      password: userLoginInfo.password,
    }

    //console.log(this.user);
    return this.user;
  }

  userApiPost(response: UserCredential){
    this.userApiService.post(
      this.userInitialization()
    ).subscribe((answer) =>{
      console.log(answer);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `User with ID: ${answer.id} has been created in the backend DB,
        and in the firebase DB with the email ${response.user.email}`,
        showConfirmButton: true
      })
      this.router.navigate(['/login']);
    })

  }



}
