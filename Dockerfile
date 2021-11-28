FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY server.js ./

COPY .env ./

COPY heroes/ heroes/

COPY services/ services/

USER node

CMD ["npm","start"]

EXPOSE 3000
