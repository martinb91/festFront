export class ArtistModel {
  id?: string;
  name: string;
  pictureURL: string;
  description: string;
  styles: Array<string>;

  constructor(param?: ArtistModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyArtist() {
    return {
      'id': '',
      'name': '',
      'pictureURL': '',
      'description': '',
      'styles' : ['']
    };
  }
}
