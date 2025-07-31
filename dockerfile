FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY src/ ./src/

RUN npm run build

RUN npm prune --production

EXPOSE 7303

CMD [ "node", "dist/app.js" ]