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
import {ArtistDetailComponent} from "../artist/artist-detail/artist-detail.component";
import {ArtistComponent} from "../artist/artist.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'event',
    component: EventComponent,
    children: [
      {path: '', component: EventListComponent},
      {path: 'new', component: EventDetailComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: EventDetailComponent, canActivate: [LoggedInGuard]}
    ]
  },
  {
    path: 'artist',
    component: ArtistComponent,
    children: [
      {path: '', component: ArtistListComponent},
      {path: 'new', component: ArtistDetailComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: ArtistDetailComponent, canActivate: [LoggedInGuard]}
    ]
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},
      {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
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
    HomeComponent,
    EventComponent,
    EventListComponent,
    EventDetailComponent,
    AboutComponent,
    LoginComponent,
    ProfileComponent,
    ProfileEditComponent,
    ArtistComponent,
    ArtistDetailComponent,
    ArtistListComponent,
    PageNotFoundComponent
  ];
}
