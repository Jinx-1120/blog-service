FROM node:8.10.0-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV


RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install pm2 -g
RUN npm install

ENTRYPOINT /bin/sh -c "npm run pm2;tail -f /dev/null"
