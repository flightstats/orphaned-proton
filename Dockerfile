FROM node:8.2-alpine

RUN adduser -S proton

RUN mkdir /app
COPY package.json /app
RUN cd /app && npm install

COPY . /app
RUN chown -R proton /app

WORKDIR /app

USER proton
CMD [ "node", "app.js"]
