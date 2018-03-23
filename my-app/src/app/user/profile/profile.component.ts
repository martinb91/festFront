import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/user-model';
import { UserService } from '../../shared/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
currentUser: UserModel;

  constructor(private _userService: UserService, public router : Router) {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  /*
    ngOnInit() {
      this.user = this._userService.getCurrentUser();
    }*/

  ngOnInit() {
  }

// login out from the app
  logOut() {
    this._userService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }
}
