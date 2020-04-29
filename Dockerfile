FROM node:13.2-alpine
RUN apk add g++ make python

RUN mkdir /var/hookah-server
COPY . /var/hookah-server

WORKDIR /var/hookah-server
RUN npm ic

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://mysql:3306 -timeout 60m npm run start
