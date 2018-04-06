import { Component, OnInit } from '@angular/core';
import {ConcertService} from "../../shared/concert.service";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../shared/event.service";
import {EventModel} from "../../shared/event-model";

@Component({
  selector: 'app-frame-for-event-details',
  templateUrl: './frame-for-event-details.component.html',
  styleUrls: ['./frame-for-event-details.component.css']
})
export class FrameForEventDetailsComponent implements OnInit {
  private event: EventModel;

  constructor(private _route: ActivatedRoute,
              private _concertService : ConcertService,
              private _eventService : EventService) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(){
    const evId = +this._route.snapshot.params['id'];
    if (evId) {
      this._eventService.getEventById(evId)
        .subscribe(evm => this.event = evm );
    }
  }

}
