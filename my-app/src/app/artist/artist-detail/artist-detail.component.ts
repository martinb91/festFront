import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../shared/artist.service";
import {ArtistModel, Style} from "../../shared/artist-model";
import {Location} from "@angular/common";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  @Input() _artist: ArtistModel;

  private _artist$: Observable<ArtistModel>;
  viewForm = true;
  private _destroy$ = new Subject<void>();
  private count = 1;
  public myForm: FormGroup;
  styles: number[]= new Array();

  constructor(private _route: ActivatedRoute, public userService: UserService, private _location: Location, private _artistService: ArtistService, private _fb: FormBuilder) {
 /*   const artistId = +this._route.snapshot.params['id'];
    this.viewForm = !!artistId;
    if (artistId) {
      this._artist$ = this._artistService.getArtistById(artistId);
      this._artist$
        .takeUntil(this._destroy$)
        .subscribe(art => this._artist_ = art
        );
      this._artist$
        .takeUntil(this._destroy$)
        .subscribe(art => this.count = art.styles.length
        );
      this._artist$.flatMap(s => s.styles).map((val, index) =>
        this.styles.push(index+1)
      ).subscribe();
    } else {
      this.styles = [1];
    }*/
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit() {
    this._artistService.save(this._artist)
      .takeUntil(this._destroy$)
      .subscribe(
        () => this.navigateBack(),
        (err) => {
          console.warn(`Error! : ${err}`);
        }
      );
  }

  save(model : Style[]){
    console.log(model);
  }
  navigateBack() {
    this._location.back();
  }

/*  remove(i: number) {
    this.styles.splice(i, 1);
  }

  add() {
    this.styles.push(++this.count);
  }*/

  ngOnInit() {
    this.myForm = this._fb.group({
      styles: this._fb.array([])
    });
/*    this._artist$
      .takeUntil(this._destroy$)
      .subscribe(art => art.styles.forEach(arti => this.addStyle(arti))
      );
    */
    this._artist.styles.forEach(arti => this.addStyle(arti));
  }

  addStyle(s?: Style) {
    console.log(s);
    const control = <FormArray>this.myForm.controls['styles'];
    const styleCtrl = this.initStyle(s);

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
