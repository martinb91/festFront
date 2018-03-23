import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../shared/artist.service";
import {ArtistModel} from "../../shared/artist-model";
import {Location} from "@angular/common";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import {FormArray, FormControl, NgForm} from "@angular/forms";


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist: ArtistModel;
  viewForm = true;
  private _destroy$ = new Subject<void>();
  private count = 1;

  styles = [1];

  @ViewChild('artistForm')
  private myForm: NgForm;

  constructor(private _route: ActivatedRoute, public userService: UserService, private _location: Location, private _artistService: ArtistService) {
  }

  ngOnInit() {
    const artistId = +this._route.snapshot.params['id'];
    this.artist = new ArtistModel();
    this.viewForm = !!artistId;
    if (artistId) {
      this._artistService.getArtistById(artistId)
        .takeUntil(this._destroy$)
        .subscribe(art => this.artist = art
        );
    }
/*    if (this.artist.styles.length > 1) {
      this.count = this.artist.styles.length; //ezt valahogy meg kell erőszakolni, hogy átvegye a tömb hosszát.
    }*/
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit() {
    this._artistService.save(this.artist)
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

  remove(i: number) {
    this.styles.splice(i, 1);
  }

  add() {
    this.styles.push(++this.count);
  }

}
