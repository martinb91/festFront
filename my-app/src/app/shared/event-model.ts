import {PositionModel} from "./position-model";

export class EventModel {
  id?: string;
  name: string;
  date: string; //  ezt majd date lesz
  pictureURL: string;
  description: string;
  positionId: number;
  position?: PositionModel;

  constructor(param?: EventModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyEvent() {
    return {
      'id': '',
      'name': '',
      'date': '',
      'pictureURL': '',
      'description': '',
      'positionId': 0
    };
  }
}
