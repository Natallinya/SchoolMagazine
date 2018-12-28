import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RequestService } from "../../../services/request.service"


@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.sass']
    })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false; 
    submitted = false;
    roles = [{id:"Admin",value:"Администратор"},{id:"Teacher",value:"Учитель"} ]
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: RequestService,
    ) { 
 
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required]],
            roles: this.roles
        });
    }
    get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

       this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                }); 
    }
}
