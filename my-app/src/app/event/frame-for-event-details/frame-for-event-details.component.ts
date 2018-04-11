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
  private event: EventModel;
  private evId: number;
  private _concerts : ConcertModel[];
  private _accommodations : AccommodationModel[];

  constructor(private _route: ActivatedRoute,
              private _concertService : ConcertService,
              private _eventService : EventService,
              private _accService : AccommodationService) {
  }

  ngOnInit() {
    this.evId = +this._route.snapshot.params['id'];
    this.getEvent();
    this.getConcersOfEvent();
    this.getAccommodations();
  }

  getEvent(){
    if (this.evId) {
      this._eventService.getEventById(this.evId)
        .subscribe(evm => this.event = evm );
    }
  }

  getConcersOfEvent(){
    if(this.evId){
      this._concertService.getConcertsByEventID(this.evId)
        .subscribe( data => {
            this._concerts = data
          }
        )
    }
  }

  getAccommodations() {
    this._accService.getAllAccommodations()
      .subscribe(data => this._accommodations = data);
  }

}
