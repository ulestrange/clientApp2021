import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import {Router} from '@angular/router'


@Component({ 
templateUrl: 'login.component.html' ,
selector: 'app-login',
})
export class LoginComponent implements OnInit {
    signinForm: FormGroup = new FormGroup({});
    message: String = "";
    
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router : Router
    ) {  }

    ngOnInit() {
        this.signinForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });
    }
    get form() 
    { 
        return this.signinForm.controls; 
    }

    onSubmit() {
        this.userService.login(this.form.email.value, this.form.password.value)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                    this.message = "Unable to log in please try again"
                });
    }

    dismissAlert() {
        this.message = "";
    }
}