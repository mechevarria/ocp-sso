import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EmptyStateModule, NavigationModule, NotificationModule, TableModule, CardModule} from 'patternfly-ng';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {McBreadcrumbsModule} from 'ngx-breadcrumbs';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {MessageService} from './services/message.service';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app-routes';
import { StatusComponent } from './status/status.component';
import { CarsComponent } from './cars/cars.component';
import {StatusService} from './services/status.service';
import {CarsService} from './services/cars.service';
import {KeycloakService} from './services/keycloak.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    StatusComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    McBreadcrumbsModule.forRoot(),
    NavigationModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    CardModule,
    NgbModule.forRoot()
  ],
  providers: [
    KeycloakService,
    MessageService,
    StatusService,
    CarsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
