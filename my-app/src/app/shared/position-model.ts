export class PositionModel {
  id: number;
  city: string;
  x: number;
  y: number;
  description: string;

  constructor(param?: PositionModel) {
    Object.assign(this, param);
  }

  static get emptyPosition() {
    return {
      'id': 0,
      'city': '',
      'x': 0,
      'y': 0,
      'description': ''
    };
  }
}
