FROM nginxinc/nginx-unprivileged

ENV NGINX_ENVSUBST_OUTPUT_DIR /tmp

COPY /nginx/nginx-conf-overwrite.conf /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html
COPY /nginx/nginx.conf.template /etc/nginx/templates/default.conf.template
