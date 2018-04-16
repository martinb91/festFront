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
  private _artistId : number;

  constructor(
    private artistService: ArtistService,
    private _route: ActivatedRoute,
    private _concertService : ConcertService) {
    this._artistId = +this._route.snapshot.params['id'];
  }
  ngOnInit() {
    if (this._artistId){
      this.getArtist();
      this.getConcersOfArtist();
    }else{
      this._artist = new ArtistModel();
    }
  }

  getArtist(){
      const artist$ = this.artistService.getArtistById(this._artistId);
      artist$
        .subscribe(art => this._artist = art
        );
  }

  getConcersOfArtist(){
      this._concertService.getConcertsByArtistID(this._artistId)
        .subscribe( data => {
          this._concerts = data
        }
      )
  }

}
