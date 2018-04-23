import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventModel } from '../../shared/event-model';
import { EventService } from '../../shared/event.service';
import { UserService } from '../../shared/user.service';
import {google} from "google-maps";
import { MapsAPILoader } from '@agm/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  public eventsGrouppedBy3$: Observable<EventModel[][]>;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  constructor(private _eventService: EventService,
              public userService: UserService,
  private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone) {

  }

  ngOnInit() {
    this.searchControl = new FormControl();

    this.eventsGrouppedBy3$ = this._eventService.getAllEvents()
      .map(data => {
        return data.reduce((acc, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
      });

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address", /*"geocode", "establishment"*/]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          /*          this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;*/
        });
      });
    });
    }

  eventsByStyle(style) {
    this.eventsGrouppedBy3$ = this._eventService.getEventsByStyle(style)
      .map(data => {
        return data.reduce((acc, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
      });
  }

}
