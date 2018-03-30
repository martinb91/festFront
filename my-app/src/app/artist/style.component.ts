import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-style',
  template: `
    <div [formGroup]="styleForm">
      <div class="form-group col-xs-6">
        <label>Fellépő stílusa</label>
        <input type="text"
               class="form-control"
               placeholder="stílus"
               formControlName="style"
        >
        <small *ngIf="styleForm.controls.style.hasError('required') && styleForm.controls.style.touched"
               class="text-danger">
          Stílus megadása kötelező
        </small>
      </div>
    </div>
  `
})
export class StyleComponent {
  @Input('group')
  public styleForm: FormGroup;
}
