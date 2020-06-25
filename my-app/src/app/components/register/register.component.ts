import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

//import { User } from '../../models/user';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) 
  { 
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value);
  }

}
