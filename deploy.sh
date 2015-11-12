#!/bin/bash

if [ "" == "${VERSION_NUMBER}" ] ; then
    VERSION_NUMBER=0001dev
    echo Defaulting version to ${VERSION_NUMBER}
fi

TAR=/bin/tar
if [ -x /usr/local/bin/gtar ] ; then
    echo "Thanks for using OSX. :("
    TAR=/usr/local/bin/gtar
fi

HOST=$1
DEPLOYUSER=$2
APPUSER=$3

TARBALL=orphaned-proton-${VERSION_NUMBER}.tgz

${TAR} -cvzf ${TARBALL} \
    --transform "s|^|orphaned-proton-${VERSION_NUMBER}/|" \
    package.json *.js config/*.conf install.sh

rsync -avv --progress ${TARBALL} \
    ${DEPLOYUSER}@${HOST}:~

ssh ${DEPLOYUSER}@${HOST} tar -xvzf ${TARBALL}
ssh ${DEPLOYUSER}@${HOST} sudo orphaned-proton-${VERSION_NUMBER}/install.sh orphaned-proton