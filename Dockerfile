FROM node:18

COPY package*.json ./
RUN npm install

RUN npm install ionic -g
COPY .  .

RUN mv ./node_modules/@ionic/app-scripts/dist/postprocess.js ./node_modules/@ionic/app-scripts/dist/postprocess.js_tmp
RUN cp ./config/replace_post_process.js ./node_modules/@ionic/app-scripts/dist/postprocess.js
RUN cat ./node_modules/@ionic/app-scripts/dist/postprocess.js

RUN npm run build
