import { Component, OnInit } from '@angular/core';
import {ConcertService} from "../../shared/concert.service";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../shared/event.service";
import {EventModel} from "../../shared/event-model";
import {ConcertModel} from "../../shared/concert-model";
import {AccommodationService} from "../../shared/accommodation.service";
import {AccommodationModel} from "../../shared/accommodation-model";

@Component({
  selector: 'app-frame-for-event-details',
  templateUrl: './frame-for-event-details.component.html',
  styleUrls: ['./frame-for-event-details.component.css']
})
export class FrameForEventDetailsComponent implements OnInit {
  private _event: EventModel;
  private  _evId: number;
  private _concerts : ConcertModel[];
  private _accommodations : AccommodationModel[];

  constructor(private _route: ActivatedRoute,
              private _concertService : ConcertService,
              private _eventService : EventService,
              private _accService : AccommodationService) {
    this._evId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    if(this._evId) {
      this.getEvent();
      this.getConcertsOfEvent();
      this.getAccommodations();
    }else {
      this._event= new EventModel();
    }
  }

  getEvent(){
      this._eventService.getEventById(this._evId)
        .subscribe(evm => this._event = evm );
  }

  getConcertsOfEvent(){
      this._concertService.getConcertsByEventID(this._evId)
        .subscribe( data => {
            this._concerts = data
          }
        )
  }

  getAccommodations() {
    this._accService.getAccommodationsByFestId(this._evId)
      .subscribe(data => this._accommodations = data);
  }

}
