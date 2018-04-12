import { Component, OnInit } from '@angular/core';
import {ArtistModel} from "../../shared/artist-model";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../shared/artist.service";
import {ConcertService} from "../../shared/concert.service";
import {ConcertModel} from "../../shared/concert-model";

@Component({
  selector: 'app-frame-for-artist-details',
  templateUrl: './frame-for-artist-details.component.html',
  styleUrls: ['./frame-for-artist-details.component.css']
})
export class FrameForArtistDetailsComponent implements OnInit {

  private _artist :ArtistModel;
  private _concerts : ConcertModel[];

  constructor(
    private artistService: ArtistService,
    private _route: ActivatedRoute,
    private _concertService : ConcertService) {

  }
  ngOnInit() {
    this.getArtist();
    this.getConcersOfArtist();
  }

  getArtist(){
    const artistId = +this._route.snapshot.params['id'];
    if (artistId) {
      const artist$ = this.artistService.getArtistById(artistId);
      artist$
        .subscribe(art => this._artist = art
        );
    }else{
      this._artist = new ArtistModel();
    }
  }

  getConcersOfArtist(){
    const artistId = +this._route.snapshot.params['id'];
    if(artistId){
      this._concertService.getConcertsByArtistID(artistId)
        .subscribe( data => {
          this._concerts = data
        }
      )
    }
  }

}
