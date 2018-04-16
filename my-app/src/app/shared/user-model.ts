export class UserModel {
  id: number;
  fullName: string;
  email: string;
  username: string;
  password: string;
  profilePictureUrl: string;

  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyUser(): UserModel {
    return {
      id: 0,
      username: '',
      fullName: '',
      email: '',
      profilePictureUrl:'',
      password:''
    };
  }
}
