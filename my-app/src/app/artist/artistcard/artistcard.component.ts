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
    if(!this.fellepo.picture || this.fellepo.picture.includes('assets/', 0)) {
      this.fellepo.picture = 'assets/musicians.png';
    }else if(this.fellepo.picture.includes(environment.Spring_API_URL, 0)){
      // do nothing
    }else{
      this.fellepo.picture =  environment.Spring_API_URL + '/files/' + this.fellepo.picture;
    }
}

  refreshByStyle(val: string){
    this.stylePush.emit(val)
  }

}
