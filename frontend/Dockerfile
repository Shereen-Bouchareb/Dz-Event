FROM node:23-alpine

WORKDIR /app
COPY . /app 

RUN  npm install 

EXPOSE 5173
USER node
CMD ["npm", "run", "dev"] 