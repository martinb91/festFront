import {PositionModel} from "./position-model";

export class EventModel {
  id?: number;
  name: string;
  beginDate: string;
  endDate: string;
  pictureURL: string;
  description: string;
  position: PositionModel;
  styles : Style[];


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
      'beginDate': '',
      'position': '',
      'endDate': ''
    };
  }
}

export class Style {
  style: string;
  id: number;
}
