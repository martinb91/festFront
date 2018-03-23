import {PositionModel} from "./position-model";

export class EventModel {
  id?: number;
  name: string;
  beginDate: string;
  endDate: string;
  pictureURL: string;
  description: string;
//  positionId: number;
  position?: PositionModel;

  constructor(param?: EventModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyEvent() {
    return {
      'id': 0,
      'name': '',
      'date': '',
      'pictureURL': '',
      'description': '',
 //     'positionId': 0,
      'beginDate': '',
      'endDate': ''
    };
  }
}
