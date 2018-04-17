# JBoss Client

Starter seed project for [Angular](https://angular.io/) and [Patternfly](https://www.patternfly.org/).  This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3. [Patternfly/NG](http://www.patternfly.org/patternfly-ng) is already integrated.  The project is also configured to run on [Openshift](https://www.openshift.com/) with no configuration changes necessary. That integrates with the [jboss-api](https://github.com/mechevarria/jboss-api) backend project.

 ![screenshot.png](screenshot.png)

## Install

Run `npm install` to dowload the project dependencies

## Development server

Run `npm run local` for a local dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  The backend by default is proxied through the proxy json files in the root directory.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## RH-SSO/Keycloak integration

Turned off by default, rename **src/keycloak.json.bak** to **src/keycloak.json**.  You will also need to configure the json file for your RH-SSO instance.

## Running on OpenShift
Requires an accessible [OpenShift Container Platform](https://www.openshift.com/container-platform/index.html) install

For local development you can use [MiniShift](https://docs.openshift.org/latest/minishift/getting-started/installing.html)

### Create the New Application

Select `Add to Project -> Catalog -> JavaScript -> Node.js`.  Make sure the version is **6**
* Name **patternfly-ng-seed**
* Git Repository URL **https://github.com/mechevarria/jboss-client**
* Click create

The default build will run a `npm install` command and then `npm run start`.
  
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get started with Angular 5, this is an excellent official [tutorial](https://angular.io/tutorial)

More help on the Patternfly/NG [components](http://www.patternfly.org/patternfly-ng/#/action)

Dropdown components were created using [ng-bootstrap](https://ng-bootstrap.github.io/#/home)

Breadcrumb component used was [ngx-breadcrumbs](https://github.com/McNull/ngx-breadcrumbs)

Other projects included with Angular are [RxJS](https://www.learnrxjs.io/) and [TypeScript](https://www.typescriptlang.org/docs/home.html)
