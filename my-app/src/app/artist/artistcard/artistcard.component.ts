import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistModel} from "../../shared/artist-model";

@Component({
  selector: 'app-artistcard',
  templateUrl: './artistcard.component.html',
  styleUrls: ['./artistcard.component.css']
})
export class ArtistcardComponent implements OnInit {

  @Input() fellepo : ArtistModel;

  @Output() stylePush = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {

  }
  refreshByStyle(val: string){
    this.stylePush.emit(val)
  }

}
