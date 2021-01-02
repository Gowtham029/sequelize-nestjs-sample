FROM node:14.15.3-apline
WORKDIR /usr/src/api

COPY dist/ .
RUN npm i
EXPOSE 3000
CMD ["node", "index.js"]