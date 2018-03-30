import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../shared/artist.service";
import {ArtistModel, Style} from "../../shared/artist-model";
import {Location} from "@angular/common";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-artist-detail3',
  templateUrl: './artist-detail3.component.html',
  styleUrls: ['./artist-detail3.component.css']
})
export class ArtistDetail3Component implements OnInit, OnDestroy {
  @Input() _artist: ArtistModel;
  viewForm = true;
  private _destroy$ = new Subject<void>();
  public myForm: FormGroup;
  constructor(private _route: ActivatedRoute, public userService: UserService, private _location: Location, private _artistService: ArtistService, private _fb: FormBuilder) {
       const artistId = +this._route.snapshot.params['id'];
       this.viewForm = !!artistId;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit(model: FormGroup) {
    console.log(model.value);
    console.log(this._artist);
            this._artistService.save(model.value)
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

  ngOnInit() {
    this.myForm = this._fb.group({
      name: [this._artist.name],
      id: [this._artist.id],
      description: [this._artist.description],
      styles: this._fb.array([])
    });
    this._artist.styles.forEach(arti => this.addStyle(arti));
  }

  addStyle(s?: Style) {
    console.log(s);
    const control = <FormArray>this.myForm.controls['styles'];
    const styleCtrl = this.initStyle(s);
    console.log(styleCtrl);
    control.push(styleCtrl);
  }

  initStyle(s?: Style) {
    let sVal = new Style();
    if (s) { sVal = s; }
    console.log(sVal);
    return this._fb.group({
      style: [sVal]
    })
  }

  removeStyle(i: number) {
    const control = <FormArray>this.myForm.controls['styles'];
    control.removeAt(i);
  }
}

