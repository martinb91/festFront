import {Injectable} from "@angular/core";
import {PositionService} from "./position.service";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {AccommodationModel} from "./accommodation-model";
import {environment} from "../../environments/environment";

@Injectable()
export class AccommodationService {

  constructor(private _positionService: PositionService, private _http: HttpClient) {
  }

  getAccommodationById(id: number) {
    return this._http.get<AccommodationModel>(`${environment.Spring_API_URL}/accommodation/${id}.json`);
  }

  getAllAccommodations(): Observable<AccommodationModel[]> {
    return this._http.get(`${environment.Spring_API_URL}/accommodation/all.json`)
      .map(data => Object.values(data).map(acc => new AccommodationModel(acc)));
  }

  save(accommodationModel: AccommodationModel) {
    console.log(accommodationModel);
    if (accommodationModel.id) { // update
      return this._http.put(`${environment.Spring_API_URL}/accommodation/${accommodationModel.id}.json`, accommodationModel);
    } else { // create
      return this._http.post(`${environment.Spring_API_URL}/accommodation/new.json`, accommodationModel);
    }
  }

}
