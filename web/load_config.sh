#!/bin/sh

echo "Hello work!"
envsubst '${REACT_APP_SERVER_PATH},${REACT_APP_SERVER_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
rm -f /etc/nginx/nginx.conf.template
cat /etc/nginx/nginx.conf
nginx -g 'daemon off;'