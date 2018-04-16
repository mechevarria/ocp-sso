<<<<<<< HEAD
# JBoss Client

Starter seed project for [Angular](https://angular.io/) and [Patternfly](https://www.patternfly.org/).  This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3. [Patternfly/NG](http://www.patternfly.org/patternfly-ng) is already integrated.  The project is also configured to run on [Openshift](https://www.openshift.com/) with no configuration changes necessary.

 ![screenshot.png](screenshot.png)

## Install

Run `npm install` to dowload the project dependencies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running on OpenShift
=======
# jboss-client

AngularJS application frontend for a hosted [JBoss EAP7](https://developers.redhat.com/products/eap/download/) REST api.  Works with [jboss-api](https://github.com/mechevarria/jboss-api)

Based on [Patternfly Seed](https://github.com/mechevarria/patternfly-seed)

Rename [keycloak.json.bak](https://github.com/mechevarria/jboss-client/blob/master/keycloak.json.bak) to **keycloak.json** to enable integration with a [Red Hat Single Sign On](https://access.redhat.com/products/red-hat-single-sign-on) local instance

## Build and Run
In the project root directory

~~~bash
npm install

npm run dev
~~~

To do a production build that **concats, minifies and uglifies** Javascript and CSS.

~~~bash
npm run start
~~~  

The completed build will be in the **dist** directory and a server with serve from the directory.  To just do a production build and not server do

~~~bash
npm run build
~~~  

## Editing
* The proxy that allows the querying the api and sso is in
`gulpfile.js`

    * By default the api is on a server `localhost` on port `8080`

### SSO Editing

* The single sign on server is by default `localhost` on port `8180`.  This is the port number if running a default SSO server `standalone.sh` 
with the option `--Djboss.socket.binding.port-offset=100`

* The default realm in the `keycloak.json` is **eap-node-realm**

* The file that authenticates against the Red Hat SSO instance, loads the user profile and then loads the Angular application is [bootstrap.js](https://github.com/mechevarria/jboss-client/blob/master/app/bootstrap.js)
* The auth token, example: `Bearer eyJhbGci...` that is injected into the header of calls against protected Red Hat SSO instances is set in [api-header-service.js](https://github.com/mechevarria/jboss-client/blob/master/app/components/api/api-header-service.js)

## Running on OpenShift

>>>>>>> 5389fb2e4d02007ab8f817b487d01a719e315ae4
Requires an accessible [OpenShift Container Platform](https://www.openshift.com/container-platform/index.html) install

For local development you can use [MiniShift](https://docs.openshift.org/latest/minishift/getting-started/installing.html)

<<<<<<< HEAD
### Create the New Application

Select `Add to Project -> Catalog -> JavaScript -> Node.js`.  Make sure the version is **6**
* Name **patternfly-ng-seed**
* Git Repository URL **https://github.com/mechevarria/patternfly-ng-seed**
* Click create

The default build will run a `npm install` command and then `npm run start`.
  
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get started with Angular 5, this is an excellent official [tutorial](https://angular.io/tutorial)

More help on the Patternfly/NG [components](http://www.patternfly.org/patternfly-ng/#/action)

Dropdown components were created using [ng-bootstrap](https://ng-bootstrap.github.io/#/home)

Breadcrumb component used was [ngx-breadcrumbs](https://github.com/McNull/ngx-breadcrumbs)

Other projects included with Angular are [RxJS](https://www.learnrxjs.io/) and [TypeScript](https://www.typescriptlang.org/docs/home.html)
=======
SSO intgretaion on Openshift has **not been tested**

### Create the New Application

Select `Add to Project -> Catalog -> JavaScript -> Node.js`.  Make sure the version is **6**
* Name **jboss-client**
* Git Repository URL **https://github.com/mechevarria/jboss-client**
* Click create

The default build will run a `npm install` command and then `npm run start`.  To run in production mode change the environment variable **NPM_RUN** to **prod**

    
## References
Built using the following libraries

[Keycloak Javascript Adaptor](https://keycloak.gitbooks.io/documentation/content/securing_apps/topics/oidc/javascript-adapter.html)

[PatternFly](http://www.patternfly.org/)

[Angular PatternFly](www.patternfly.org/angular-patternfly/)

[UI Bootstrap](https://angular-ui.github.io/bootstrap/)


![cli.png](screenshot.png)

>>>>>>> 5389fb2e4d02007ab8f817b487d01a719e315ae4
