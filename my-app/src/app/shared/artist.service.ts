import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import {ArtistModel} from './artist-model';

@Injectable()
export class ArtistService {

  constructor( private _http: HttpClient) {
  }

  getArtistById(id: number) {
    return this._http.get<ArtistModel>(`${environment.Spring_API_URL}/artists/${id}.json`);
  }

  getAllArtists(): Observable<ArtistModel[]> {
    return this._http.get(`${environment.Spring_API_URL}/artists/artists.json`)
      .map(data => Object.values(data).map(artist => new ArtistModel(artist)));
  }

  save(artist: ArtistModel) {
    if (artist.id && artist.id != 0 ) { // update
      return this._http.put(`${environment.Spring_API_URL}/artists/${artist.id}.json`, artist);
    } else { // create
      return this._http.post(`${environment.Spring_API_URL}/artists/new.json`, artist);
    }
  }

  deleteById(id: number) {
    const params = new HttpParams().set('id', id.toString());
    return this._http.delete(`${environment.Spring_API_URL}/artists/delete`, { params });
  }

  getArtistsByStyle(style : string) {
    return this._http.get<ArtistModel>(`${environment.Spring_API_URL}/artists/style/${style}.json`)
      .map(data => Object.values(data).map(artist => new ArtistModel(artist)));
  }

}
