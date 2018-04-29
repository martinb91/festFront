import { Component, OnInit } from '@angular/core';
import {AccommodationModel} from "../../shared/accommodation-model";
import {UserService} from "../../shared/user.service";
import {AccommodationService} from "../../shared/accommodation.service";
import {PositionModel} from "../../shared/position-model";
import {Subject} from "rxjs/Subject";
import {Location} from "@angular/common";
import {MouseEvent} from "@agm/core";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {
  private _accommodation : AccommodationModel;
  private _destroy$ = new Subject<void>();
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: false
  }

  constructor(
    private _accommodationService : AccommodationService,
    private _userService: UserService,
    private _location: Location
  ) { }

  ngOnInit() {
      this.init();
  }

  onSubmit(){
    this._accommodationService.save(this._accommodation).takeUntil(this._destroy$)  // valamiért nem fut le.. ha csak a save függyényt hívom meg
      .subscribe(
        () => {alert('Sikeresen rögzítve!'), this.init()},
        (err) => {
          console.warn(`Error! : ${err}`);
        }
      );
  }

  navigateBack() {
    this._location.back();
  }

  init(){
    this._accommodation = new AccommodationModel();
    this._accommodation.address = new PositionModel();
    this._accommodation.address.x=47.5;
    this._accommodation.address.y=19;
  }

  markerDragEnd($event: MouseEvent) {
    this._accommodation.address.x = $event.coords.lat;
    this._accommodation.address.y = $event.coords.lng;
  }
}
