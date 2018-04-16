import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {KeycloakService} from './app/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}


KeycloakService.init()
  .then(loadProfile)
  .catch(handleError);


function loadProfile() {
  KeycloakService.loadProfile()
    .then(loadAngular)
    .catch(handleError);
}

function loadAngular() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

function handleError(error) {
  console.warn('keycloak did not load, starting angular');
  loadAngular();
}
