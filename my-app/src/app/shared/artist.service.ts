import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/observable/of";
import "rxjs/add/observable/forkJoin";
import {ArtistModel} from "./artist-model";

@Injectable()
export class ArtistService {
  private _artists: ArtistModel[];

  constructor( private _http: HttpClient) {
    //   this._artists = this._getMockData();
  }

  getEventById(id: string) {
    const art = this._artists.filter(x => x.id === id);
    return art.length > 0 ? art[0] : new ArtistModel(ArtistModel.emptyArtist);
  }

  getAllArtists(): Observable<ArtistModel[]> {
    return this._http.get(`${environment.firebase.baseUrl}/artists.json`)
      .map(data => Object.values(data).map(artist => new ArtistModel(artist)));
  }
/*  update(param: ArtistModel) {
    this._artists = this._artists.map(ar => {
      return ar.id === param.id ? {...param} : ar;
    });
  }*/

  create(param: ArtistModel) {
    console.log(param);
    this._artists = [
      ...this._artists,
      {
        id: this._getMaxId() + 1,
        ...param
      }
    ];
  }

  private _getMaxId() {
    return this._artists.reduce((x, y) => x.id > y.id ? x : y).id;
  }

    public _getMockData() : ArtistModel[] {
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
    }
}
