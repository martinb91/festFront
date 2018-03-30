import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ArtistModel, Style} from "../../shared/artist-model";
import {ArtistService} from "../../shared/artist.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-artist-detail2',
  templateUrl: './artist-detail2.component.html',
  styleUrls: ['./artist-detail2.component.css']
})
export class ArtistDetail2Component implements OnChanges{
  @Input() private _artist: ArtistModel;

  private artForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    public userService: UserService,
    ) {
    this.createForm();
  }

  createForm() {
    this.artForm = this.fb.group({
      name: '',
      styles: this.fb.array([])
/*      description: '',
      id: ''*/
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

   rebuildForm() {
      this.artForm.reset({
        name: this._artist.name
      });
      this.setStyles(this._artist.styles);
    }

  get styles(): FormArray {
      return this.artForm.get('styles') as FormArray;
    };

   setStyles(style: Style[]) {
      const addressFGs = style.map(style => this.fb.group(style));
      const styleFormArray = this.fb.array(addressFGs);
      this.artForm.setControl('styles', styleFormArray);
    }

       addLair() {
       this.styles.push(this.fb.group(new Style()));
     }
  /*
      onSubmit() {
        this._artist = this.prepareSaveHero();
        this.artistService.updateHero(this._artist).subscribe(/!* error handling *!/);
        this.rebuildForm();
      }

      prepareSaveHero(): Hero {
        const formModel = this.heroForm.value;

        // deep copy of form model lairs
        const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
          (address: Address) => Object.assign({}, address)
        );

        // return new `Hero` object containing a combination of original artist value(s)
        // and deep copies of changed form model values
        const saveHero: Hero = {
          id: this._artist.id,
          name: formModel.name as string,
          // addresses: formModel.secretLairs // <-- bad!
          addresses: secretLairsDeepCopy
        };
        return saveHero;
      }*/

   revert() { this.rebuildForm(); }


}
