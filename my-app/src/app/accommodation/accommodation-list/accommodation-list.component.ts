import {Component, Input, OnInit} from '@angular/core';
import {AccommodationModel} from "../../shared/accommodation-model";

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent implements OnInit {

  @Input() _accommodations : AccommodationModel[];

  constructor() { }

  ngOnInit() {
  }

}
