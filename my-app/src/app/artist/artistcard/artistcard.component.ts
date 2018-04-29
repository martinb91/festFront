import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistModel} from "../../shared/artist-model";
import {environment} from "../../../environments/environment";

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
    this.fellepo.picture ? this.fellepo.picture = environment.Spring_API_URL + '/files/' + this.fellepo.picture : this.fellepo.picture = 'assets/musicians.png';
}
  refreshByStyle(val: string){
    this.stylePush.emit(val)
  }

}
