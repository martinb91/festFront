import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../shared/artist.service";
import {UserService} from "../../shared/user.service";
import {ArtistModel} from "../../shared/artist-model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artistsGrouppedBy3$: ArtistModel[];

  constructor(private _artistService: ArtistService, public userService: UserService) {
  }

  ngOnInit() {
   this.artistsGrouppedBy3$ = this._artistService._getMockData()
      .reduce((acc, curr: ArtistModel, ind: number) => {
          if (ind % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
    console.log(this.artistsGrouppedBy3$);
  }
}
