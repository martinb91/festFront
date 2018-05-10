import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/user-model';
import { UserService } from '../../shared/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
user: UserModel;

  constructor(private _userService: UserService, public router : Router) {
  this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
