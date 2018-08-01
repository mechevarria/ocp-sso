# JBoss Client

Angular client built on [Angular](https://angular.io/) and [Patternfly](https://www.patternfly.org/). 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli). 
[Patternfly/NG](http://www.patternfly.org/patternfly-ng) is already integrated. 
The project is also configured to run on [Openshift](https://www.openshift.com/) with no configuration changes necessary. 
This project integrates with the [jboss-api](https://github.com/mechevarria/jboss-api) backend. 
You can optionally enable [Red Hat Single-Sign on/Keycloak integration](https://access.redhat.com/products/red-hat-single-sign-on)

 ![screenshot.png](screenshot.png)

## Install

Run `npm install` to dowload the project dependencies

## Development server

Run `npm run local` for a local dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files. 
The backend by default is proxied through the proxy json files in the root directory.

## Code scaffolding

Run `npm run ng generate component component-name` to generate a new component. You can also use `npm run ng generate directive|pipe|service|class|guard|interface|enum|module`.  This is referencing the locally installed angular-cli.

## Build

Run `npm run build` to build the project in production mode. The build artifacts will be stored in the `dist/` directory.

## RH-SSO/Keycloak integration

Turned off by default, the configuration for an existing RH-SSO/Keycloak instance is in **src/assets/keycloak.json**

To run a local development server with RH-SSO/keycloak enabled run `npm run localKeycloak`
 
To build in production with RH-SSO/keycloak enabled run `npm run buildKeycloak`

To enable RH-SSO/keycloak on Openshift you must edit the `build` script in **package.json** to use the **keycloakProduction** configuration instead of the **production** configuration

All configurations point to environment settings specified in **angular.json** 

## Running on OpenShift
Requires an accessible [OpenShift Container Platform](https://www.openshift.com/container-platform/index.html) install

For local development you can use [MiniShift](https://docs.openshift.org/latest/minishift/getting-started/installing.html)

### Create the New Application

Select `Add to Project -> Catalog -> JavaScript -> Node.js`.  Make sure the version is **8** or later
* Name **patternfly-ng-seed**
* Git Repository URL **https://github.com/mechevarria/jboss-client**
* Click create

The default build will run a `npm install, npm run build` initially and then `npm run start` when the container is run.
  
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get started with Angular, this is an excellent official [tutorial](https://angular.io/tutorial)

More help on the Patternfly/NG [components](http://www.patternfly.org/patternfly-ng/#/action)

The community project for Red Hat Single-Sign On, [Keycloak](https://www.keycloak.org/)

Dropdown components were created using [ng-bootstrap](https://ng-bootstrap.github.io/#/home)

Breadcrumb component used was [ngx-breadcrumbs](https://github.com/exalif/angular-libs/tree/master/projects/exalif/ngx-breadcrumbs)

Other projects included with Angular are [RxJS](https://www.learnrxjs.io/) and [TypeScript](https://www.typescriptlang.org/docs/home.html)
