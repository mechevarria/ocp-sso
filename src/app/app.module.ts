import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CardModule, EmptyStateModule, NotificationService, TableModule, ToastNotificationListModule, VerticalNavigationModule} from 'patternfly-ng';
import {BreadcrumbsModule} from '@exalif/ngx-breadcrumbs';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app-routes';
import {StatusComponent} from './status/status.component';
import {CarsComponent} from './cars/cars.component';
import {KeycloakService} from './common/keycloak.service';
import {ProfileComponent} from './profile/profile.component';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';

export function jwtOptionsFactory(keycloakService) {
  return {
    tokenGetter: () => {
      return keycloakService.getToken();
    }
  };

}


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
    ModalModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [KeycloakService]
      }
    })
  ],
  providers: [
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
