#jboss-api - Let jboss manage the db connection
The assumption is that PostgreSQL is already installed and running.  This configuration allows admins to health check the database connection from the admin console

## Install the jdbc driver
If using the JBoss Developer studio

`devstudio/runtimes/jboss-eap/bin/jboss-cli.sh`

`connect`

Adjust the path to the PostgreSQL jar as necessary

`module add --name=org.postgresql --resources=/home/redhat/git/jboss-api/jboss-module/postgresql-9.4.1212.jar --dependencies=javax.api,javax.transaction.api subsystem=datasources/jdbc-driver=postgresql:add(driver-name="postgresql",driver-module-name="org.postgresql")`

## Configure the jdbc connection using the newly installed driver
In the jboss admin console

`http://localhost:9990/console`

goto **Configuration -> Subsystems -> Datasources -> Non-XA**

Click Add -> PostgreSQL Datasource

In the wizard select the **posgresql** driver you configured in the detected driver tab

