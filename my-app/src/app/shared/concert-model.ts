import {ArtistModel} from "./artist-model";
import {EventModel} from "./event-model";

export class ConcertModel {
  id?: number;
  artist: ArtistModel;
  beginDate: string;
  festival: EventModel;


  constructor(param?: ConcertModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get emptyConcert() {
    return {
      'id': 0,
      'artist': undefined,
      'festival' : undefined,
      'beginDate' : ''
    };
  }
}
