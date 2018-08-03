import {Injectable} from '@angular/core';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';

/*
*  Modified from https://github.com/keycloak/keycloak/tree/master/examples/demo-template
*/


declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  static auth: any = {};
  static configPath = 'assets/data/keycloak.json';

  static init(): Observable<any> {
    return fromPromise(KeycloakService.initPromise());
  }

  static initPromise(): Promise<any> {
    const keycloakAuth: any = new Keycloak(this.configPath);
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

  static getConfig(): Observable<any> {
    const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    return http.get(this.configPath);
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

  getToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (KeycloakService.auth.loggedIn) {
        if (KeycloakService.auth.authz.token) {
          KeycloakService.auth.authz.updateToken(5)
            .success(() => {
              resolve(KeycloakService.auth.authz.token);
            })
            .error(() => {
              reject('Failed to refresh token');
            });
        }
      } else {
        resolve({});
      }
    });
  }
}
