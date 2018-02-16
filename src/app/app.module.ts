import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {NavigationModule} from 'patternfly-ng';
import {NotificationModule} from 'patternfly-ng';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CardComponent} from './card/card.component';
import {TableComponent} from './table/table.component';
import {NavComponent} from './nav/nav.component';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    TableComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    ),
    AppRoutingModule,
    NavigationModule,
    NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
