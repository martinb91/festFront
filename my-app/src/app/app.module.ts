import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, CollapseModule} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {NavbarComponent} from "./core/navbar/navbar.component";
import {JumbotronComponent} from "./core/jumbotron/jumbotron.component";
import {FooterComponent} from "./core/footer/footer.component";
import {RoutingModule} from "./routing/routing.module";
import {EventcardComponent} from "./event/eventcard/eventcard.component";
import {EventService} from "./shared/event.service";
import {UserService} from "./shared/user.service";
import {PositionService} from "./shared/position.service";
import {LoggedInGuard} from "./shared/logged-in.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ArtistcardComponent } from './artist/artistcard/artistcard.component';
import {ArtistService} from "./shared/artist.service";
import {MomentModule} from "angular2-moment";
import 'moment/locale/hu';
import {HttpModule} from "@angular/http";
import {StyleComponent} from "./artist/style.component";
import { ConcertListComponent } from './concert/concert-list/concert-list.component';
import {ConcertService} from "./shared/concert.service";
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import {AccommodationService} from "./shared/accommodation.service";
import {AgmCoreModule} from "@agm/core";
import {AngularDateTimePickerModule} from "angular2-datetimepicker";
import { ConcertDetailComponent } from './concert/concert-detail/concert-detail.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { ConcertComponent } from './concert/concert.component';
import { PictureComponent } from './picture/picture.component';
import { FileUploadModule } from 'ng2-file-upload';
import {LoadFileService} from "./shared/load-file.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    ...RoutingModule.routableComponents,
    EventcardComponent,
    ArtistcardComponent,
    StyleComponent,
    ConcertListComponent,
    AccommodationListComponent,
    ConcertDetailComponent,
    AccommodationComponent,
    ConcertComponent,
    PictureComponent
  ],
  imports: [
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    AngularDateTimePickerModule,
    HttpModule,
    FileUploadModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZs-O5Vb71bgxvWMtiC0xHUO5SWRGM3Vw',
      libraries: ["places"]
    }),
    ReactiveFormsModule
  ],
  providers: [EventService, UserService, PositionService, ArtistService, ConcertService, LoggedInGuard, AccommodationService, LoadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
