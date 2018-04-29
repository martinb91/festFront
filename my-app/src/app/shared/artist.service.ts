import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
/*        .map((PostReturn: { name: string }) => PostReturn.name)
        .switchMap(sId => this._http.patch(
          `${environment.Spring_API_URL}/artists/${sId}.json`,
          {id: sId}
        )); */
    }
  }

  deleteById(id: number) {
    console.log(id);
    this._http.delete(`${environment.Spring_API_URL}/artists/${id}.json`);
  }

  getArtistsByStyle(style : string) {
    return this._http.get<ArtistModel>(`${environment.Spring_API_URL}/artists/style/${style}.json`)
      .map(data => Object.values(data).map(artist => new ArtistModel(artist)));
  }



}
