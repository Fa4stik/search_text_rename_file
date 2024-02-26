FROM node:latest as node
WORKDIR /app
COPY .. .
RUN npm i --force
RUN npm run build

FROM nginx:latest as nginx
WORKDIR /usr/share/nginx/html

RUN rm -rf ./* && rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/ssl && chmod 700 /etc/nginx/ssl

COPY --from=node /app/build/ .
COPY --from=node /app/web/nginx.conf.template /etc/nginx
COPY --from=node /app/web/carrotocr.crt /etc/nginx/ssl
COPY --from=node /app/web/carrotocr.key /etc/nginx/ssl
COPY --from=node /app/web/carrotocr.pem /etc/nginx/ssl

COPY --from=node /app/web/load_config.sh /app/load_config.sh
RUN ["chmod", "+x", "/app/load_config.sh"]

ENTRYPOINT ["/bin/sh", "-c", "/app/load_config.sh"]