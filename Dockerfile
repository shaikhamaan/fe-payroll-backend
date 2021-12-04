FROM node:17-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install



COPY . .

RUN npx prisma generate

CMD [ "npm" ,"start"]
