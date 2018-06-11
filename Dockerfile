FROM node:9.5
COPY . /app
WORKDIR /app
RUN npm install
CMD node ./bin/node-server
EXPOSE 3000
