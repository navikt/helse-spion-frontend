FROM navikt/node-express:12.2.0-alpine
COPY . /var/server

EXPOSE 3000
CMD ["npm", "start"]
