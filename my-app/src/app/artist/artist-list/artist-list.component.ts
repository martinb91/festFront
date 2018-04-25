import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArtistService} from "../../shared/artist.service";
import {UserService} from "../../shared/user.service";
import {ArtistModel} from "../../shared/artist-model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinctUntilChanged';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit, AfterViewInit {
  artistList$: Observable<ArtistModel[]>;
  @ViewChild('searchNameInput') searchNameInput: ElementRef;
  @ViewChild('searchStyleInput') searchStyleInput: ElementRef;
  private filteredNameText$ = new BehaviorSubject<string>(null);
  private filteredStyleText$ = new BehaviorSubject<string>(null);

  constructor(private _artistService: ArtistService, public userService: UserService) {
  }

  ngOnInit() {
      /*.map(data => {
        return data.reduce((acc, curr: ArtistModel, ind: number) => {
            if (ind % 3 === 0) {
              acc.push([]);
            }
            acc[acc.length - 1].push(curr);
            return acc;
          }, []);
      });*/
      this.backToDefault();
  }

  artistsByStyle(style){
    this.artistList$ = this._artistService.getArtistsByStyle(style);
    this.artistList$ = this.addFilter(this.artistList$);
    this.artistList$ = this.addStyleFilter(this.artistList$);
  }

  addFilter(artists:Observable<ArtistModel[]>){
   return artists.flatMap(
      artists => {
        return this.filteredNameText$.map(
          filterText => {
            if (filterText === null) {
              return artists;
            } else {
              return artists.filter(
                artist => {
                  return artist.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
                }
              );
            }
          }
        );
      }
    );
  }

  addStyleFilter(artists:Observable<ArtistModel[]>){
    return artists.flatMap(
      artists => {
        return this.filteredStyleText$.map(
          filterText => {
            if (filterText === null) {
              return artists;
            } else {
              return artists.filter(
                artist => {for (let i=0; i<artist.styles.length; i++){
                  if(artist.styles[i].style.toLowerCase().indexOf(filterText.toLowerCase()) > -1)
                    return true;
                  }
                }
              );
            }
          }
        );
      }
    );
  }

  ngAfterViewInit(): void {
    Observable.fromEvent(this.searchNameInput.nativeElement, 'keyup')
      .delay(600)
      .map(
        (event: Event) => {
          return (event.srcElement as HTMLInputElement).value;
        }
      )
      .distinctUntilChanged()
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredNameText$.next(text);
        }
      );
    Observable.fromEvent(this.searchStyleInput.nativeElement, 'keyup')
      .delay(600)
      .map(
        (event: Event) => {
          return (event.srcElement as HTMLInputElement).value;
        }
      )
      .distinctUntilChanged()
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredStyleText$.next(text);
        }
      );
  }

  backToDefault() { // nem az igazi
    this.artistList$ = this._artistService.getAllArtists();
    this.artistList$ = this.addFilter(this.artistList$);
    this.artistList$ = this.addStyleFilter(this.artistList$);
  }
}
