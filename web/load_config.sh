#!/bin/sh

echo "Hello work!"
envsubst '${NGINX_SERVER_PATH},${NGINX_SERVER_PORT_HTTP},${NGINX_SERVER_PORT_HTTPS}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
rm -f /etc/nginx/nginx.conf.template
cat /etc/nginx/nginx.conf

rm -f /usr/share/nginx/html/config.json
cat <<EOF > /usr/share/nginx/html/config.json
{
  "env": {
    "REACT_APP_SERVER_PATH": "${REACT_APP_SERVER_PATH}",
    "REACT_APP_API_PROTOCOL": "${REACT_APP_API_PROTOCOL}",
    "REACT_APP_SERVER_PORT": "${REACT_APP_SERVER_PORT}",
    "REACT_APP_WS_PROTOCOL": "${REACT_APP_WS_PROTOCOL}"
  }
}
EOF

nginx -g 'daemon off;'