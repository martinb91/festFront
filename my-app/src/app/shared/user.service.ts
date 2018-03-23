import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router,private _http: HttpClient, private httpAuth: Http) {
    this._allUsers = this._getMockData();
  }

/*  login(email: string, password: string): boolean {
    if (email === 'angular' && password === 'angular') {
      this._user =this._allUsers[2];
      this.isLoggedin = true;
      return true;
      // this._router.navigate(['/user']);
    }
    console.log('be vagyunk-e lepve:', this.isLoggedin);
    return false;
  }*/

  login(email: string, password: string){
    this._user= new UserModel;
    this._user.password=password;
    this._user.email=email;
    console.log(this._user.password + " " + this._user.email);
     this.logIn(this._user)
      .subscribe(data=>{
        this.isLoggedin = true;
        this._router.navigate(['/user']);
        return true;
        },err=>{
          this.isLoggedin = false;
        return false;
        }
      )
  }

  register(param?: UserModel) {
    if (param) {
      this._user = new UserModel({
        id: 4,
        ...param
      });

      this._allUsers = [
        ...this._allUsers,
        this._user
      ];
    }
    this.isLoggedin = true;
    console.log('be vagyunk-e lepve:', this.isLoggedin);
  }

  logout() {
    this._user = new UserModel();
    this.isLoggedin = false;
    this._router.navigate(['/home']);
    console.log('be vagyunk-e lepve:', this.isLoggedin);
  }

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
    return this._user;
  }

  private _getMockData() {
    return [
      new UserModel({
        id: 0,
        name: 'Géza',
        email: 'geza@valami.com',
        password: 'xyz',
        address: 'Fő út',
        dateOfBirth: '1999.01.01',
        gender: 'male',
        'profilePictureUrl': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nBubms8tp5EDXG6LBhVyy4AES2WCqceh674hyF6rNwjYoJ4ddQ'
      }),
      new UserModel({
        'id': 1,
        'name': 'Pista ba',
        'email': 'pistaba@pistaba.com',
        'password': 'xyz',
        'address': 'pistaba lak 12',
        'dateOfBirth': '1900-01-01',
        'gender': 'male',
        'profilePictureUrl': 'http://3.bp.blogspot.com/-bUS0WbXC1YA/Uz0di05mS_I/AAAAAAAAQGg/u9o_g9VDTSg/s1600/pista_ba_animacio.jpg'
      }),
      new UserModel({
        'id': 2,
        'name': 'Marcsa',
        'email': 'marcsa@marcsa.hu',
        'address': 'marcsa var 42.',
        'password': 'xyz',
        'dateOfBirth': '2000-01-01',
        'gender': 'female',
        'profilePictureUrl': 'https://i.pinimg.com/236x/2c/80/53/2c80536d805ca08bd1f87d9db9fb9955--funny-wallpapers-wallpaper-iphone.jpg'
      }),
      new UserModel({
        'id': 3,
        'name': 'ifju satan',
        'email': 'mzx@mzx.hu',
        'address': 'namek',
        'password': 'xyz',
        'dateOfBirth': '2199-02-01',
        'gender': 'satan fattya',
        'profilePictureUrl': 'https://www.minihero.hu/wp-content/uploads/funko-pop-ifju-satan.jpg'
      }),
    ];
  }

  updateUser(param: UserModel) {
    this._user = new UserModel(param);
  }

  public logIn(user: UserModel){

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa( user.email+ ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;

    return this.httpAuth.get(environment.Spring_API_URL+"/account/login" ,   options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json().principal;// the returned user object is a principal object
        if (user) {
          this.isLoggedin=response.json().authorized;
          // store user details  in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }
  logOut() {
    // remove user from local storage to log user out
    this.logout();
    return this._http.post(environment.Spring_API_URL+"logout",{})
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      });

  }

}
