FROM node:18-alpine

LABEL Developers="Robin Augereau"

WORKDIR /app

USER node:node

COPY --chown=node:node . .

# RUN npm ci
#RUN npm install --production
RUN npm install
RUN npm run build

RUN rm -rf src/ static/ Dockerfile

EXPOSE 3000

CMD ["node","build/index.js"]
