FROM node:21-alpine
WORKDIR /app
COPY package*.json ./
COPY server.js ./
COPY environment.js ./
COPY ["src", "/app/src"]
RUN npm install --production
CMD [ "node", "server.js" ]
EXPOSE 8084