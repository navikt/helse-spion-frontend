FROM navikt/node-express:12.2.0-alpine
COPY . /var/server

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000
CMD ["npm", "start"]
