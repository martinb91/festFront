import {Injectable} from '@angular/core';
import {PositionModel} from "./position-model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PositionService {
  private _positions: PositionModel[];

  constructor(private _http: HttpClient) {
    this._positions = [
      new PositionModel({
        'id': 1,
        'city': 'Hajógyári sziget',
        'x': 11,
        'y': 22,
        'description': 'string'
      }),
      new PositionModel({
        'id': 2,
        'city': 'Opera',
        'x': 11,
        'y': 22,
        'description': 'string'
      }),
      new PositionModel({
        'id': 3,
        'city': 'Miskolc',
        'x': 11,
        'y': 22,
        'description': 'string'
      })
    ];
  }

  getPositionById(id: number) {
    return this._http.get<PositionModel>(`${environment.firebase.baseUrl}/places/${id}.json`);
/*    const pos = this._positions.filter(x => x.id === id);
    return pos.length > 0 ? pos[0] : new PositionModel(PositionModel.emptyPosition);*/
  }

}
