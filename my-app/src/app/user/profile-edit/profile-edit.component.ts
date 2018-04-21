import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../shared/user-model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user: UserModel;

  constructor(private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
    this.user = this._userService.isLoggedin ? this._userService.getCurrentUser() : new UserModel();
  }

  onSubmit() {
    if (this.user.id) {
      this._userService.updateUser(this.user);
    }
    this._router.navigate(['/user']);
  }

  createUser(pass: string) {
    console.log(pass);
    this._userService.register(this.user, pass)
      .subscribe(
        data => this._router.navigate(['/user'])
      );
  }

}
