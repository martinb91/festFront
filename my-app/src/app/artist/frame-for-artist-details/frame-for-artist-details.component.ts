import { Component, OnInit } from '@angular/core';
import {ArtistModel} from "../../shared/artist-model";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../shared/artist.service";

@Component({
  selector: 'app-frame-for-artist-details',
  templateUrl: './frame-for-artist-details.component.html',
  styleUrls: ['./frame-for-artist-details.component.css']
})
export class FrameForArtistDetailsComponent implements OnInit {

  viewForm = true;
  private _artist :ArtistModel;

  constructor(
    private artistService: ArtistService,
    private _route: ActivatedRoute) {

  }
  ngOnInit() {
    this.getArtist();
  }

  getArtist(){
    const artistId = +this._route.snapshot.params['id'];
    this.viewForm = !!artistId;
    if (artistId) {
      const _artist$ = this.artistService.getArtistById(artistId);
      _artist$
        .subscribe(art => this._artist = art
        );
    }
  }

}
