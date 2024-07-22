FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./dist ./dist

CMD ["node", "dist/index.js"]
