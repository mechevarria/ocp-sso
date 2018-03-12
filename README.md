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

Name the service **eap-server**

This will allow seamless integration with [JBoss Client](https://github.com/mechevarria/jboss-client)

The backend database connection to Postgresql requires two additional environment variables

**DB_USER** and **DB_PASS**

You can optionally import the **credentials.json** file into Openshift to mask the user/password and then select the credentials as a secret for the runtime values. To import after logging into your project:

`oc create -f credentials.json`

A **Postgresql** instance on Openshift needs to be deployed with the default name **postgresql**, databasename **jboss** and username and password that matches the **DB_USER** and **DB_PASS** environment variables.

## Single Sign On
* The server configuration is in [keycloak.json](https://github.com/mechevarria/jboss-api/blob/sso/src/main/webapp/WEB-INF/keycloak.json)
* The additional elements are added in [web.xml](https://github.com/mechevarria/jboss-api/blob/sso/src/main/webapp/WEB-INF/web.xml)

By default the keycloak config is commented out

The EAP instance requires that the [Java Adapter](https://keycloak.gitbooks.io/documentation/securing_apps/topics/oidc/java/jboss-adapter.html) be installed

## Install the jdbc driver
The following will help setup and source like Postgresql

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


