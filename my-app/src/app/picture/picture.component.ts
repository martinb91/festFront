import {Component, Input} from '@angular/core';
import {LoadFileService} from "../shared/load-file.service";
import {  HttpResponse, HttpEventType } from '@angular/common/http';
import {Location} from "@angular/common";
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent{

   @Input('picParams') params : string;
  selectedFiles: FileList;
  currentFile: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: LoadFileService, private _location: Location) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFile, this.params).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('Fájl feltöltve!');
      }
    });

    this.selectedFiles = undefined;
  }

}
