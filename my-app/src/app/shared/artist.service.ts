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
  private _artists: ArtistModel[];

  constructor( private _http: HttpClient) {
       // this._artists = this._getMockData();
  }

  getArtistById(id: number) {
    return this._http.get<ArtistModel>(`${environment.Spring_API_URL}/artists/${id}.json`);
  }

  getAllArtists(): Observable<ArtistModel[]> {
    return this._http.get(`${environment.Spring_API_URL}/artists/artists.json`)
      .map(data => Object.values(data).map(artist => new ArtistModel(artist)));
  }

/*    public _getMockData() : ArtistModel[] {
      return [
        new ArtistModel({
          'id': '31',
          'name': 'AWS',
          'styles': ['metal', 'rock'],
          'pictureURL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/A_Dal_2018_AWS_2018-02-17.jpg/1200px-A_Dal_2018_AWS_2018-02-17.jpg',
          'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
        }),
        new ArtistModel({
          'id': '32',
          'name': 'Tesco Disco',
          'styles': ['indie rock', 'electroclash'],
          'pictureURL': 'https://phenomenon.hu/kep/nagyelonezet/koncertozon2.jpg',
          'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
        }),

        new ArtistModel({
          'id': '34',
          'name': 'Lajkó Félix',
          'styles': ['zongora', 'hegedű', 'citera', 'folk', 'népzene'],
          'pictureURL': 'https://i.ytimg.com/vi/x-SuyWy7LRw/maxresdefault.jpg',
          'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
        }),
        new ArtistModel({
          'id': '33',
          'name': 'Fekete Pákó',
          'styles': ['mulatós', 'low-quality'],
          'pictureURL': 'http://ocdn.eu/pulscms-transforms/1/oJPktkpTURBXy9kYjYxMDhlMDZhZjgwMjZiN2E4M2Q2ZmMwYWVlYjA5Yi5qcGeRkwXNAxTNAbw',
          'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
        }),
        new ArtistModel({
          'id': '35',
          'name': 'Alvin és a mókusok',
          'styles': ['rock', 'punk', 'szókimondó'],
          'pictureURL': 'http://www.alvinrecords.com/images/hirek/RAF%20bori19box_kicsi_INSTA.jpg',
          'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
        })
      ];
    }*/
  save(artist: ArtistModel) {
    if (artist.id) { // udpate
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
}
