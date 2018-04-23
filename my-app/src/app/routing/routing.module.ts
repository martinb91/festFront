import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from "../home/home.component";
import {EventDetailComponent} from "../event/event-detail/event-detail.component";
import {EventListComponent} from "../event/event-list/event-list.component";
import {EventComponent} from "../event/event.component";
import {AboutComponent} from "../about/about.component";
import {PageNotFoundComponent} from '../core/page-not-found/page-not-found.component';
import {ProfileEditComponent} from "../user/profile-edit/profile-edit.component";
import {ProfileComponent} from "../user/profile/profile.component";
import {LoginComponent} from "../user/login/login.component";
import {LoggedInGuard} from "../shared/logged-in.guard";
import {ArtistListComponent} from "../artist/artist-list/artist-list.component";
import {ArtistComponent} from "../artist/artist.component";
import {ArtistDetail3Component} from "../artist/artist-detail3/artist-detail3.component";
import {FrameForArtistDetailsComponent} from "../artist/frame-for-artist-details/frame-for-artist-details.component";
import {FrameForEventDetailsComponent} from "../event/frame-for-event-details/frame-for-event-details.component";
import {AccommodationDetailsComponent} from "../accommodation/accommodation-details/accommodation-details.component";
import {AccommodationComponent} from "../accommodation/accommodation.component";
import {ConcertComponent} from "../concert/concert.component";
import {ConcertDetailComponent} from "../concert/concert-detail/concert-detail.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'event',
    component: EventComponent,
    children: [
      {path: '', component: EventListComponent},
      {path: 'new', component: FrameForEventDetailsComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: FrameForEventDetailsComponent, canActivate: [LoggedInGuard]}
    ]
  },
  {
    path: 'accommodation',
    component: AccommodationComponent,
    children: [
      {path: 'new', component: AccommodationDetailsComponent, canActivate: [LoggedInGuard]},
    ]
  },
  {
    path: 'concert',
    component: ConcertComponent,
    children: [
      {path: 'new', component: ConcertDetailComponent, canActivate: [LoggedInGuard]},
    ]
  },
  {
    path: 'artist',
    component: ArtistComponent,
    children: [
      {path: '', component: ArtistListComponent},
      {path: 'new', component: FrameForArtistDetailsComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: FrameForArtistDetailsComponent, canActivate: [LoggedInGuard]}
    ]
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},
      // {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: ProfileEditComponent}
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class RoutingModule {
  static routableComponents = [
    FrameForArtistDetailsComponent,
    FrameForEventDetailsComponent,
    AccommodationDetailsComponent,
    HomeComponent,
    EventComponent,
    EventListComponent,
    EventDetailComponent,
    AboutComponent,
    LoginComponent,
    ProfileComponent,
    ProfileEditComponent,
    ArtistComponent,
    ArtistDetail3Component,
    ArtistListComponent,
    PageNotFoundComponent
  ];
}
