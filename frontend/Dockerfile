FROM node:16-alpine

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npx next telemetry disable

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
