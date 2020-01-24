FROM openresty/openresty:alpine-fat

# User env var is needed for luarocks to not complain.
ENV APP_DIR="/app" \
    USER="root"

COPY build /app/spion
COPY deploy/proxy.nginx      /nginx/proxy.nginx

# Copying over the config-files.
COPY files/default-config.nginx /etc/nginx/conf.d/app.conf.template
COPY files/oidc_protected.lua   /usr/local/openresty/nginx/
COPY files/start-nginx.sh       /usr/sbin/start-nginx
RUN chmod u+x /usr/sbin/start-nginx
RUN mkdir -p /nginx

EXPOSE 9000 8012 443

WORKDIR ${APP_DIR}

CMD ["start-nginx"]
