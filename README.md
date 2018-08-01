# RH-SSO

This repo is working in progress! Instructions are just merged from other repos

After deployment go to the SSO console and configure the realm. The default user/password is admin/Redhat1!

Under clients, select create

* id is eap, then select save

* change access type to bearer-only, then select save

* create another client, id of js

* set valid redirect uris to the route name of the nodejs-app plus a /*, example: https://nodejs-app-ntier.192.168.42.130.nip.io/*

* set Web Origins to *

* under users add a new user. Give values for username, email, first name and last name. Select save

* on the credentials tab of the user set the password, uncheck temporary and select Reset Password


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

# jboss-api

Java EE basic REST application that can be deployed on [JBoss EAP7](https://developers.redhat.com/products/eap/download/).  The [pom.xml](https://github.com/mechevarria/jboss-api/blob/master/pom.xml) was copied and edited from the [jboss-eap-quickstarts](https://github.com/jboss-developer/jboss-eap-quickstarts)

The [web.xml](https://github.com/mechevarria/jboss-api/blob/master/src/main/webapp/WEB-INF/web.xml) has a config that can be uncommented to integrate with [Red Hat Single Sign On](https://access.redhat.com/products/red-hat-single-sign-on)

## To get started
Import as a maven project in [JBoss Developer Studio](https://www.redhat.com/en/technologies/jboss-middleware/developer-studio)

Once deployed, you can see a status value at
http://localhost:8080/jboss-api/status

This project works to create a [Angular Resource](https://docs.angularjs.org/api/ngResource/service/$resource) REST api that works with [jboss client](https://github.com/mechevarria/jboss-client) and can do all CRUD operations on the `jboss-api/item` endpoint

You can also import the integration tests as a collection to [Postman](https://www.getpostman.com/)

The `assets` directory has scripts to help with an external Postgresql datasource.

ou will need [PostgreSQL](https://www.postgresql.org/) already installed and running.  This configuration allows admins to health check the database connection from the EAP admin console

## Openshift

Run with the **Red Hat JBoss EAP 7.1** xPaas image

Name the service **eap-app**

This will allow seamless integration with [JBoss Client](https://github.com/mechevarria/jboss-client)

The backend database connection to Postgresql requires environment variables

You can import the **credentials.json** file into Openshift to mask the user/password and then select the credentials as a secret for the runtime values. To import after logging into your project:

`oc create -f credentials.json`

A **Postgresql** instance on Openshift needs to be deployed with the default name **postgresql**, databasename **jboss** and username and password that matches the **credentials.json** environment variables.

## Single Sign On
* The server configuration is in [keycloak.json](https://github.com/mechevarria/jboss-api/blob/sso/src/main/webapp/WEB-INF/keycloak.json)
* The additional elements are added in [web.xml](https://github.com/mechevarria/jboss-api/blob/sso/src/main/webapp/WEB-INF/web.xml)

By default the keycloak config is commented out

The EAP instance requires that the [Java Adapter](https://keycloak.gitbooks.io/documentation/securing_apps/topics/oidc/java/jboss-adapter.html) be installed

## Install the jdbc driver
The following will help setup a source like Postgresql. This helper is for a non-openshift deployment

### Script
The script will install the postgres driver and configure it as a driver for EAP.  Adjust the path to the jboss cli tool.

```bash
jboss-module/module.sh add
``````

## Configure the jdbc connection using the newly installed driver
In the jboss admin console

`http://localhost:9990/console`

goto **Configuration -> Subsystems -> Datasources -> Non-XA**

Click **Add -> PostgreSQL Datasource**

Accept the default datasource attributes **PostgresDS** and **java:/PostgresDS**

In the JDBC Driver step select the **postgresql** option in the Detected Driver tab

In the Connection Settings use

jdbc:postgresql://localhost:5432/**jboss**

username: **jboss**

password **jboss**

After finishing the wizard, select **PostgresDS** > **Test Connection** to verify


## Removing the Datasource and Driver

### Script
This is will remove the datasource, driver and module

```bash
jboss-module/module.sh rm
``````


