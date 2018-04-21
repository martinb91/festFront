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
  constructor(private _router: Router,private _http: HttpClient, private httpAuth: Http) {
  }

  login(email: string, password: string){
    this._user= new UserModel;
    this._user.password=password;
    this._user.email=email;
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

  logout() {
    this._user = new UserModel();
    this.isLoggedin = false;
    this._router.navigate(['/home']);
    console.log('be vagyunk-e lepve:', this.isLoggedin);
  }

  getCurrentUser() {
    return this._user;
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
        console.log(response);
        if (user) {
          this._user=user;
          this.isLoggedin=response.json().authorized;
          // store user details  in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }
  logOut() {
    // remove user from local storage to log user out
    this.logout();
    return this._http.post(environment.Spring_API_URL+"/logout",{}) // ez nincs megvalósítva, de nem is kell
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      });

  }

  register(user: UserModel, pw : string) {
    user.password=pw;
    console.log(user);
    return this._http.post(environment.Spring_API_URL+"/account/register",user).map((user: UserModel)=>
      localStorage.setItem('currentUser', JSON.stringify(user)));
  }
}
