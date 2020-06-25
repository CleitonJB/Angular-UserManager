import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../../models/user';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  currentUser: User = {
    _id: '',
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private actRoute: ActivatedRoute
  ) 
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res: any) => {
      this.currentUser = res.msg;
    })
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
  }

}
