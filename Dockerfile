FROM node:20.19.4

WORKDIR /app

COPY package*.json ./

RUN npm i -g npm@10.8.2

COPY . .

EXPOSE 4200

CMD ["bash", "-c", "npm install --include=optional && npx ng serve --host 0.0.0.0 --poll 2000"]
