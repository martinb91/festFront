import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {environment} from "../../environments/environment";

@Injectable()
export class LoadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, prms : String): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', `${environment.Spring_API_URL}/${prms}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
