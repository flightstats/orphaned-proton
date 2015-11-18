#!/bin/bash

APPUSER=$1
DIR=`dirname $0`

echo Shutting down orphaned-proton
sudo stop orphaned-proton

echo Installing ${DIR} for ${APPUSER}

sudo rsync -avv ${DIR} /home/${APPUSER}/
sudo chown -R ${APPUSER}:${APPUSER} /home/${APPUSER}/${DIR}
sudo rm /home/${APPUSER}/orphaned-proton
sudo ln -s /home/${APPUSER}/${DIR} /home/${APPUSER}/orphaned-proton

echo Copying over SSH cert
ssh ${DEPLOYUSER}@${HOST} sudo cp /home/${APPUSER}/key.pem /home/${APPUSER}/cert.pem /home/${APPUSER}/orphaned-proton/

echo Installing upstart script
sudo cp /home/${APPUSER}/${DIR}/config/orphaned-proton.conf /etc/init/

echo Running npm install
sudo su - ${APP_USER} -c "cd /home/${APPUSER}/orphaned-proton && npm install"

echo Starting orphaned-proton
sudo start orphaned-proton