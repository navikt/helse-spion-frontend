FROM navikt/nginx-oidc:latest

ARG BACKEND="https://helse-spion.nais.preprod.local"

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/spion" \
	APP_URL_SPION=$BACKEND

COPY build /app/spion
COPY deploy/proxy.nginx      /nginx/proxy.nginx


EXPOSE 9000 443
