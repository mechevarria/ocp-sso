import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
    CardModule,
    EmptyStateModule,
    NotificationService,
    TableModule,
    ToastNotificationListModule,
    VerticalNavigationModule
} from 'patternfly-ng';
import {BreadcrumbsModule} from '@exalif/ngx-breadcrumbs';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {MessageService} from './common/message.service';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app-routes';
import {StatusComponent} from './status/status.component';
import {CarsComponent} from './cars/cars.component';
import {StatusService} from './status/status.service';
import {CarsService} from './cars/cars.service';
import {KeycloakService} from './common/keycloak.service';
import {ProfileComponent} from './profile/profile.component';
import {KeycloakInterceptor} from './common/keycloak.interceptor';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    StatusComponent,
    CarsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    BreadcrumbsModule.forRoot(),
    VerticalNavigationModule,
    ToastNotificationListModule,
    EmptyStateModule,
    TableModule,
    CardModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    NotificationService,
    KeycloakService,
    MessageService,
    StatusService,
    CarsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
