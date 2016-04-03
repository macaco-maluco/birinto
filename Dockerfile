FROM node:0.10.44

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PORT 80
ENV NODE_ENV production
EXPOSE 80

COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app

CMD [ "npm", "start" ]
