# Red Hat Openshift Single Sign-On Secured N-tier application

This project contains scripts and source to deploy a 3 tier application along with [Red Hat Single Sign-On](https://access.redhat.com/products/red-hat-single-sign-on) and secures the application with SSL.

The application has a [node.js](https://nodejs.org/en/) run [Angular](https://angular.io/) frontend (tier 1) that calls a 
[Spring Boot](http://spring.io/projects/spring-boot) REST backend (tier 2) and a 
[JBoss EAP](https://access.redhat.com/products/red-hat-jboss-enterprise-application-platform/) REST backend (tier 2) that persists data
to a [Postgresql](https://www.postgresql.org/) database (tier 3).
The Red Hat Single Sign-On deployment secures this deployed via a configured realm called **java-js-realm**.  The realm contains
configured clients for the public facing frontend (js) and the bearer only backend (eap). The security is simple and only checks that a **valid user is logged in**

All of the scripts to help deploy require that you are logged in via the [oc](https://docs.openshift.com/container-platform/3.10/cli_reference/get_started_cli.html) command line tool to 
a [Openshift](https://www.openshift.com/) cluster or [minishift](https://www.okd.io/minishift/) instance

Example: `oc login -u developer`

![screenshot](./screenshots/summary.png)

## Deploy Red Hat Single Sign-On

Go to the `sso` folder and run the `ocp-deploy-sso.sh` script.  Once finished you will see the deployed pods in the **SSO N-tier** project.
The login to the RH-SSO admin console is **admin/Redhat1!**

Run only if you get an **image not found error**: In the `sso` folder install the required templates with the `ocp-install-templates.sh` script.

![screenshot](./screenshots/sso.png)

### Set the Public Key in the config map

Make sure the RH-SSO instance is up. Once the Red Hat Single Sign-on instance is up you will need to modify the [config map](https://docs.openshift.com/container-platform/3.10/dev_guide/configmaps.html) used
by the JBoss EAP backend to communicate with Red Hat Single Sign-On.
`
* In the **RH-SSO admin console**, go to the **java-js-realm**, the **keys** tab and select **Public Key** and copy the value.

![screenshot](./screenshots/key.png)

* In the **SSO N-Tier project**, go to **Resources** then **Config Maps**

* Edit the **ntier-config** and paste the value into the **PUBLIC_KEY** entry

![screenshot](./screenshots/config.png)

## Deploy JBoss EAP and Postgresql

In the `eap` folder run the `ocp-deploy-eap.sh` script.

## Deploy Spring Boot

In the `springboot` folder run the `ocp-deploy-springboot.sh` script.

## Deploy node.js

In the `node` folder run the `ocp-deploy-node.sh` script.

## Configure Clients

While the builds are running you can configure the clients in RH-SSO. 

### JS Client
* In the **java-js-realm**, select **clients**, then **create**
* Set **Client ID** to **js**, then select **save**
* Set **Valid Redirect URIs** to the route of your node.js instance plus **/***.  Example: `https://nodejs-app-ntier.192.168.42.24.nip.io/*`
* Set **Web Origins** to `*` 
* Select **save**

![screenshot](./screenshots/js.png)

## Java Client
* In the **java-js-realm**, select **clients**, then **create**
* Set **Client ID** to **java**, then select **save**
* Set **Access Type** to **bearer-only**
* Select **save**
 
## Create User

* In the **java-js-realm**, select **Users**, then **Add User**
* Fill out the **Username**, **Email**, **First Name** and **Last Name** fields
* Select **save**
* On the **Credentials** tab, set a **new password**
* Set **temporary** to **off**
* Select **Reset Password**
* Confirm that you want to **Change the password**

## Test!

Now that everything is configured, go to the **node-js** application route and you should be prompted to login as the user you just created.

You will be able to see your user attributes under the **Profile** tab.

Using the **Status** and **Cars** tabs will make REST calls to the JBoss EAP REST backend

![screenshot](./screenshots/test.png)


