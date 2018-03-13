import {Component, Input, OnInit} from '@angular/core';
import {ArtistModel} from "../../shared/artist-model";

@Component({
  selector: 'app-artistcard',
  templateUrl: './artistcard.component.html',
  styleUrls: ['./artistcard.component.css']
})
export class ArtistcardComponent implements OnInit {

  @Input() fellepo : ArtistModel;

  constructor() { }

  ngOnInit() {
  }

}
