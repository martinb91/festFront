import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModel} from "../../shared/event-model";
import {ArtistModel} from "../../shared/artist-model";

@Component({
  selector: 'app-eventcard',
  templateUrl: './eventcard.component.html',
  styleUrls: ['./eventcard.component.css']
})
export class EventcardComponent implements OnInit {
  @Input() esemeny: EventModel;

  @Output() stylePush = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {

  }
  refreshByStyle(val: string){
    this.stylePush.emit(val)
  }

}
