FROM navikt/nginx-oidc:latest

ARG BACKEND="https://helse-spion.nais.preprod.local"

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/helse-spion-frontend" \
	APP_URL_SPION=$BACKEND

COPY build /app/helse-spion-frontend
COPY k8s/proxy.nginx      /nginx/proxy.nginx


EXPOSE 9000 443
