import {Component, Input, OnInit} from '@angular/core';
import {ConcertModel} from "../../shared/concert-model";

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {

  @Input() _concerts : ConcertModel[];

  constructor() { }

  ngOnInit() {
  }

}
