import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {EventService} from "../../shared/event.service";
import {ArtistService} from "../../shared/artist.service";
import {EventModel} from "../../shared/event-model";
import {Observable} from "rxjs/Observable";
import {ArtistModel} from "../../shared/artist-model";
import {ConcertService} from "../../shared/concert.service";
import {ConcertModel} from "../../shared/concert-model";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {
  concert: ConcertModel;
  events$: Observable<EventModel[]>;
  artists$: Observable<ArtistModel[]>;
  private _destroy$ = new Subject<void>();
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: false
  }

  constructor( private _eventService: EventService,
               private _userService: UserService,
               private _artistService: ArtistService,
               private _concertService: ConcertService,
               private _router: Router) {
    this.concert = new ConcertModel();
    this.concert.festival= new EventModel();
    this.concert.artist= new ArtistModel();
    this.concert.beginDate = new Date();

  }

  ngOnInit() {
    this.events$ = this._eventService.getAllEvents();
    this.artists$= this._artistService.getAllArtists();
  }

  onSubmit(){
    this._concertService.save(this.concert)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this._router.navigate(['/home']),
        (err) => {
          console.warn(`Error! : ${err}`);
        }
      );
  }

}
