import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AlertModule, CollapseModule} from 'ngx-bootstrap';

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
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ArtistcardComponent } from './artist/artistcard/artistcard.component';
import {ArtistService} from "./shared/artist.service";
import {MomentModule} from "angular2-moment";
import 'moment/locale/hu';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    ...RoutingModule.routableComponents,
    EventcardComponent,
    ArtistcardComponent
  ],
  imports: [
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MomentModule
  ],
  providers: [EventService, UserService, PositionService, ArtistService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
