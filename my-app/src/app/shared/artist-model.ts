export class ArtistModel {
  id?: number;
  name: string;
  pictureURL: string;
  description: string;
  styles: ArtistStyleModel[];

  constructor(param?: ArtistModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyArtist() {
    return {
      'id': 0,
      'name': '',
      'pictureURL': '',
      'description': '',
      'styles' : ['']
    };
  }
}

export class ArtistStyleModel{
  style :string;
}
