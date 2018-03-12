#!/bin/bash

jboss_cli=~/local/runtimes/7-eap/bin/jboss-cli.sh

if [[ "$1" = "rm" ]] ; then
  cmds="rm-commands.cli"
  ${jboss_cli} -c file="cli/rm-ds.cli"
  ${jboss_cli} -c file="cli/rm-driver-module.cli"

elif [[ "$1" = "add" ]]; then
  ${jboss_cli} -c file="cli/add-module-driver.cli"

else
  echo "usage: module.sh [add|rm]"
  exit
fi
