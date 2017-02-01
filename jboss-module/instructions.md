# jboss-api - Let jboss manage the db connection


The assumption is that PostgreSQL is already installed and running.  This configuration allows admins to health check the database connection from the admin console



## Install the jdbc driver

### Script

`./module.sh add`

### Manual

`~/local/devstudio/runtimes/jboss-eap/bin/jboss-cli.sh`

`connect`

Adjust the path to the PostgreSQL jar as necessary

`module add --name=org.postgresql --resources=/home/redhat/git/jboss-api/jboss-module/postgresql-9.4.1212.jar --dependencies=javax.api,javax.transaction.api`

`/subsystem=datasources/jdbc-driver=postgresql:add(driver-name="postgresql",driver-module-name="org.postgresql")`



## Configure the jdbc connection using the newly installed driver
In the jboss admin console

`http://localhost:9990/console`

goto **Configuration -> Subsystems -> Datasources -> Non-XA**

Click Add -> PostgreSQL Datasource

Accept the default datasource attributes **PostgresDS** and **java:/PostgresDS**

In the JDBC Driver step select the **postgresql** option in the Detected Driver tab

In the Connection Settings use

jdbc:postgresql://localhost:5432/**jboss**

username: **jboss**

password **jboss**

After finishing the wizard, select **PostgresDS** > **Test Connection** to verify



## Removing the Datasource and Driver

### Script

`./module.sh rm`

### Manual

`~/local/devstudio/runtimes/jboss-eap/bin/jboss-cli.sh`

`connect`

`data-source disable --name=PostgresDS`

`data-source remove --name=PostgresDS`

`/:reload`

`/subsystem=datasources/data-source=postgresql:remove`

`/subsystem=datasources/jdbc-driver=postgresql:remove`

`module remove --name=org.postgresql`

