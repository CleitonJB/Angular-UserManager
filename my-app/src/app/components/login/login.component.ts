import { Component, OnInit } from '@angular/core';

//import { User } from './../../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) 
  { 
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value);
  }

}
