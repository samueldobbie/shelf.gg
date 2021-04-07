FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

RUN yarn build

RUN npm install -g serve

CMD [ "serve", "-s", "build" ]
