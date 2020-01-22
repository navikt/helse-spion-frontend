FROM navikt/nginx-oidc:latest

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/" \
	APP_URL_SPION="http://helse-spion.default.svc.nais.local"

COPY dist /app/
COPY k8s/proxy.nginx      /nginx/proxy.nginx

EXPOSE 3000
