import { Component, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-style',
  template: `
    <div [formGroup]="styleForm">
      <div class="form-group col-xs-6">
        <input *ngIf="viewForm; else editM"
               type="text"
               class="form-control"
               placeholder="stílus"
               formControlName="style"
               [attr.disabled]="true"
        >
        <ng-template #editM>
        <input  type="text"
               class="form-control"
               placeholder="stílus"
               formControlName="style"
        ></ng-template>
        <!--<small *ngIf="styleForm.controls.style.hasError('required') && styleForm.controls.style.touched"
               class="text-danger">
          Stílus megadása kötelező
        </small>-->
      </div>
    </div>
  `
})
export class StyleComponent {
  @Input('group')
  public styleForm: FormGroup;

  @Input() private viewForm : boolean;
}
