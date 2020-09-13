FROM node:12.15.0-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV


RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install pm2 -g
RUN npm install --registry https://registry.npm.taobao.org

CMD ["pm2-runtime",".app.js","-i","4", "--watch", "--name", "blog-service"]
