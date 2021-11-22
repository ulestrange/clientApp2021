import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';


@Component({ 
templateUrl: 'login.component.html' ,
selector: 'app-login',
})
export class LoginComponent implements OnInit {
    signinForm: FormGroup = new FormGroup({});
    message: String = "";
    
    constructor(
        private fb: FormBuilder,
        private userService: UserService
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
                    console.log(data);
                    this.message = `Login successful for ${data.firstName} need to implement redirect`
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