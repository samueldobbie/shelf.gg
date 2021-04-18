FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

RUN yarn build

RUN npm install -g serve

EXPOSE 5000

CMD [ "serve", "-s", "build" ]
