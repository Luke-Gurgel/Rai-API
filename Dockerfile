FROM node:lts-bullseye-slim

WORKDIR /rai-api

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

CMD ["bash"]