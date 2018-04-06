import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {Location} from "@angular/common";
import {UserService} from "../../shared/user.service";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  @Input() event: EventModel;
  viewForm = true;

  // ezt a subject-et fogjuk hasznalni az ossszes subscription zárására
  private _destroy$ = new Subject<void>();

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _location: Location,
              public userService: UserService) {
  }

  ngOnInit() {
    const evId = this._route.snapshot.params['id'];
    this.viewForm = !!evId;
    console.log(event);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
/*
  onSubmit() {
    this._eventService.save(this.event)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Problémánk van a form mentésnél: ${err}`);
        }
      );
  }

  delete() {
    this._eventService.delete(this.event)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Problémánk van a form mentésnél: ${err}`);
        }
      );
  }*/

  navigateBack() {
    this._location.back();
  }
}
