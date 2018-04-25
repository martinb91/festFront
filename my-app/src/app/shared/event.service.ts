import {Injectable} from '@angular/core';
import {EventModel} from './event-model';
import {PositionService} from "./position.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

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
    eventModel.endDate = new Date( eventModel.endDate);
    eventModel.beginDate = new Date( eventModel.beginDate);

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


  getEventsByQuery(posX: number, posY: number, maxFromPos: number, isFree: boolean, styleName: string, begin: Date, end: Date) : Observable<EventModel[]> {
    let prms = new HttpParams();
    if(posX !== 0 && posX != null && posX != undefined) {
      prms = prms.append('posX', String(posX));
      prms = prms.append('posY', String(posY));
      if(maxFromPos !== 0 && maxFromPos != null && maxFromPos != undefined) {
        prms = prms.append('maxFromPos', String(maxFromPos));
      }
    }

    prms = prms.append('isFree', String(isFree));

    if(styleName !== "" && styleName != null && styleName != undefined) {
      prms = prms.append('styleName', styleName);
    }
    if(begin && begin != null && begin != undefined) {
      prms = prms.append('begin', String(begin));
    }
    if(end && end != null && end != undefined) {
      prms = prms.append('end', String(end));
    }

    return this._http.get<EventModel>(`${environment.Spring_API_URL}/festival/query`, {params: prms})
      .map(data => Object.values(data).map(fest => new EventModel(fest)));

  }

}

// AIzaSyDZs-O5Vb71bgxvWMtiC0xHUO5SWRGM3Vw  API-key Google Maps
