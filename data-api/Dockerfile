FROM node:21.7.3
RUN mkdir /app
WORKDIR /app
COPY package.json ./

RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]