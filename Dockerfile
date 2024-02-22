FROM alpine as builder
WORKDIR /app
COPY build ./build
COPY web .

FROM nginx:latest
WORKDIR /usr/share/nginx/html

RUN rm -rf ./* && rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/ssl && chmod 700 /etc/nginx/ssl

COPY --from=builder /app/build/ .
COPY --from=builder /app/nginx.conf.template /etc/nginx
COPY --from=builder /app/carrotocr.crt /etc/nginx/ssl
COPY --from=builder /app/carrotocr.key /etc/nginx/ssl
COPY --from=builder /app/carrotocr.pem /etc/nginx/ssl

COPY --from=builder /app/load_config.sh /app/load_config.sh
RUN ["chmod", "+x", "/app/load_config.sh"]

ENTRYPOINT ["/bin/sh", "-c", "/app/load_config.sh"]

