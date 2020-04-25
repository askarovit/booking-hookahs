FROM node:13.2-alpine
RUN apk add g++ make python

RUN mkdir /var/hookah-server
COPY . /var/hookah-server

WORKDIR /var/hookah-server
RUN npm ic

CMD ["npm", "run", "start"]
