import {Injectable} from '@angular/core';
import {EventModel} from './event-model';
import {PositionService} from "./position.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {ArtistModel} from "./artist-model";
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";

@Injectable()
export class EventService {

  constructor(private _positionService: PositionService, private _http: HttpClient) {
  }

  getEventById(id: number) {
    return this._http.get<EventModel>(`${environment.Spring_API_URL}/festival/${id}.json`);
  }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get(`${environment.Spring_API_URL}/festival/all.json`)
      .map(data => Object.values(data).map(event => new EventModel(event)));
  }

  save(eventModel: EventModel) {
    console.log(eventModel.endDate = new Date( eventModel.endDate));
    console.log(eventModel.beginDate = new Date( eventModel.beginDate));

    if (eventModel.id) { // update
      return this._http.put(`${environment.Spring_API_URL}/festival/${eventModel.id}.json`, eventModel);
    } else { // create
      return this._http.post(`${environment.Spring_API_URL}/festival/new.json`, eventModel);
    }
  }

  getEventsByStyle(style: string) {
    return this._http.get<EventModel>(`${environment.Spring_API_URL}/festival/style/${style}.json`)
      .map(data => Object.values(data).map(fest => new EventModel(fest)));
  }
}

// AIzaSyDZs-O5Vb71bgxvWMtiC0xHUO5SWRGM3Vw  API-key Google Maps
