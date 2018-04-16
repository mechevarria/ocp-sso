import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {KeycloakService} from './app/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}

KeycloakService.init()
  .then(() => {
    load();
  })
  .catch(() => {
    console.warn('Failed to init keycloak');
    load();
  });

function load() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}
