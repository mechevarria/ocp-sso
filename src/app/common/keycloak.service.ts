import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';

/*
*  Modified from https://github.com/keycloak/keycloak/tree/master/examples/demo-template
*/


declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Observable<any> {
    return fromPromise(KeycloakService.initPromise());
  }

  static initPromise(): Promise<any> {
    const keycloakAuth: any = new Keycloak('keycloak.json');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.logoutUrl = '';

    return new Promise((resolve, reject) => {
      keycloakAuth.init({onLoad: 'login-required'})
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${keycloakAuth.realm}/protocol/openid-connect/logout?redirect_uri=${window.location.href}`;
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  static loadProfile(): Observable<any> {
    return fromPromise(KeycloakService.profilePromise());
  }

  private static profilePromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      KeycloakService.auth.authz.loadUserProfile()
        .success(res => {
          KeycloakService.auth.profile = res;
          resolve();
        })
        .error(() => {
          reject();
        })
      ;
    });
  }

  getAuth(): any {
    return KeycloakService.auth;
  }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }

  getToken(): Observable<string> {
    return fromPromise(this.tokenPromise());
  }

  private tokenPromise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }
}
