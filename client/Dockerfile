FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

COPY . .

RUN npm run clean
RUN npm run build-client

EXPOSE 3001

CMD ["npm", "start"]
