import {PositionModel} from "./position-model";

export class EventModel {
  id?: number;
  name: string;
  beginDate: Date;
  endDate: Date;
  picture: string;
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
      'picture': '',
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
