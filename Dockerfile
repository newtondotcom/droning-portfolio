FROM node:18-alpine

LABEL Developers="Robin Augereau"

WORKDIR /app

COPY . .

# RUN npm ci
RUN npm install --production

RUN npm run build

RUN rm -rf src/ static/ Dockerfile

USER node:node

CMD ["node","build/index.js"]