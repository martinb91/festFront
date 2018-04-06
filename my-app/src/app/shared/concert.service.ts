import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ConcertModel} from "./concert-model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConcertService {

  constructor( private _http: HttpClient) {

  }

  getConcertsByArtistID(id: number) :Observable<ConcertModel[]>{
    return this._http.get<ConcertModel>(`${environment.Spring_API_URL}/concert/byArtist/${id}.json`)
      .map(data => Object.values(data).map(concert => new ConcertModel(concert)));
  }
}
