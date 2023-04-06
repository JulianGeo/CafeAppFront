import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit{


  formReg: FormGroup;
  formRegPersonalInfo: FormGroup;


  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required,
          //Validator for password, at least 5 characters, at least one letter and one number
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$')])
    });

    this.formRegPersonalInfo = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
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
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  isFormsInvalid() {
    return this.formReg.invalid || this.formRegPersonalInfo.invalid;
  }


}
