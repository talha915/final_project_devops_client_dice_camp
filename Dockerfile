FROM node:14

volume /clientvol

WORKDIR /clientdata

COPY package*.json ./
COPY client.js/ /clientdata/client.js
# COPY clientdata/ /clientdata/clientdata/received_file.txt

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]