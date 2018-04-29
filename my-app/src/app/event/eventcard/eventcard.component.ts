import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModel} from "../../shared/event-model";
import {ArtistModel} from "../../shared/artist-model";
import {environment} from "../../../environments/environment";

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
    this.esemeny.picture ? this.esemeny.picture = environment.Spring_API_URL + '/files/' + this.esemeny.picture : this.esemeny.picture = 'assets/event.jpg';
  }
  refreshByStyle(val: string){
    this.stylePush.emit(val)
  }

}
