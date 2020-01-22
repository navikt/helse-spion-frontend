FROM navikt/nginx-oidc:latest

ARG BACKEND="http://helse-spion.default.svc.nais.local"

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/" \
	APP_URL_SPION=$BACKEND

RUN yarn build

COPY build /app/
COPY k8s/proxy.nginx      /nginx/proxy.nginx

EXPOSE 3000
