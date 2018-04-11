import {PositionModel} from "./position-model";

export class AccommodationModel {
  id?: number;
  name: string;
  price: number;
  address: PositionModel;
  description: string;
  email: string;
  phoneNumber: string;
  heads : number;
  website: string;

  constructor(param?: AccommodationModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyAccommodation() {
    return {
      'id': 0,
      'name': '',
      'price': 0,
      'address': undefined,
      'description': '',
      'email': '',
      'phoneNumber': '',
      'heads' : 0
    };
  }
}
