FROM node:20-alpine

RUN npm install -g nodemon --silent

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
