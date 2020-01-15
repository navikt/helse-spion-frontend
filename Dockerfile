FROM navikt/node-express:12.2.0-alpine

ENV NODE_ENV production
ENV HTTPS true

CMD ["npm", "run build"]

COPY . /var/server

EXPOSE 3000

CMD ["npm", "start"]
