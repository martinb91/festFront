import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {Location} from "@angular/common";
import {UserService} from "../../shared/user.service";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import {Style} from "../../shared/artist-model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { MouseEvent } from '@agm/core';
import {PositionModel} from "../../shared/position-model";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  @Input() _event: EventModel;
  viewForm = true;
  private _destroy$ = new Subject<void>();
  public myForm: FormGroup;
  private picPrms : String;
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: false
  }

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _location: Location,
              public userService: UserService,
              private _fb: FormBuilder) {
    const evId = +this._route.snapshot.params['id'];
    this.viewForm = !!evId;
  }


  ngOnInit() {
    this._event.picture ? this._event.picture = environment.Spring_API_URL + '/files/' + this._event.picture : this._event.picture = 'assets/event.jpg';
    this.picPrms = "festival/upload/" + this._event.id;
    if(this._event.name) {
      this.myForm = this._fb.group({
        name: new FormControl({value: this._event.name, disabled: true}),
        id: [this._event.id],
        description: new FormControl({value: this._event.description, disabled: true}),
        styles: this._fb.array([]),
        beginDate: new FormControl({value: this._event.beginDate, disabled: true}),
        endDate: new FormControl({value: this._event.endDate, disabled: true}),
/*        beginDate: new FormControl({value: new Date(this._event.beginDate), disabled: true}),
        endDate: new FormControl({value: new Date(this._event.endDate), disabled: true}),*/
        position: this._fb.group({
          id: [this._event.position.id],
          x: new FormControl({value: this._event.position.x, disabled: true}),
          y: new FormControl({value: this._event.position.y, disabled: true}),
          city: new FormControl({value: this._event.position.city, disabled: true})
        })
      });
      this._event.styles.forEach(arti => this.addStyle(arti));
    }else {
      this._event.position = new PositionModel();
      this._event.position.x = 47.5;
      this._event.position.y = 19.05;
      this.myForm = this._fb.group({
        name: [''],
        id: [0],
        description: [''],
        styles: this._fb.array([]),
        beginDate: [new Date()],
        endDate: [new Date()],
        position: this._fb.group({
          id: [0],
          x: [0],
          y: [0],
          city: ['']
        })
      });
    }


  }

  markerDragEnd($event: MouseEvent) {
   this._event.position.x = $event.coords.lat;
   this._event.position.y = $event.coords.lng;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  addStyle(s?: Style) {
    const control = <FormArray>this.myForm.controls['styles'];
    const styleCtrl = this.initStyle(s);
    control.push(styleCtrl);
  }

  initStyle(s?: Style) {
    let sVal = new Style();
    if (s) { sVal = s; }
    console.log(sVal.style);
    return this._fb.group({
      style: [sVal.style],
      id: [sVal.id]
    })
  }

  removeStyle(i: number) {
    const control = <FormArray>this.myForm.controls['styles'];
    control.removeAt(i);
  }

  editMode(){
    this.viewForm = false;
    // this.myForm.get('name').enable();
    //
    this.myForm.enable();
  }

  onSubmit(model: FormGroup) {
    this._eventService.save(model.value)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Error! : ${err}`);
        }
      );
  }
  navigateBack() {
    this._location.back();
  }

  delete(){
    let val = this._eventService.deleteById(this._event.id)
    if(val){
      setTimeout(() =>
        {
          this.navigateBack();
        },
        333);
    }

  }

}
