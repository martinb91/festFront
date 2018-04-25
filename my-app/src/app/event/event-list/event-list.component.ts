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
  public searchMapControl: FormControl;

  //vars for search module
  posX : number;
  posY : number;
  maxFromPos : number;
  styleName : string;
  isFree : boolean;
  begin : Date;
  end : Date;

  constructor(private _eventService: EventService,
              public userService: UserService,
  private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone) {
    this.isFree= false;
    this.posX =0;
    this.posY =0;
    this.maxFromPos = 0;
  }

  ngOnInit() {
    this.searchMapControl = new FormControl();

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
          //set latitude, longitude
          this.posX = place.geometry.location.lat();
          this.posY = place.geometry.location.lng();
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

  onSubmit(){
    if(this.searchMapControl.value===""){
      this.posY=undefined;
      this.posX=undefined;
    }
    this.eventsGrouppedBy3$ = this._eventService.getEventsByQuery(this.posX, this.posY, this.maxFromPos, this.isFree, this.styleName, this.begin, this.end).map(data => {
      return data.reduce((acc, curr: EventModel, ind: number) => {
        if (ind % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
      }, []);
    });;
  }

}
