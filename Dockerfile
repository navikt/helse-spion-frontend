FROM navikt/nginx-oidc:latest

ARG BACKEND="https://helse-spion.nais.preprod.local"

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/" \
	APP_URL_SPION=$BACKEND

COPY build /app/
COPY k8s/proxy.nginx      /nginx/proxy.nginx

EXPOSE 3000
