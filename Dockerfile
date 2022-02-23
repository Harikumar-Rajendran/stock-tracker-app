#### Stage 1: Build the react application
FROM node:14.18.1 

#### Create WORK Directory
WORKDIR /code
#### Config Port
ENV PORT 8080
#### Copy Dependencies
COPY package.json /code/package.json
#### Install Dependencies
RUN npm install
#### copy to code
COPY . /code
#### Execute command
CMD [ "node","src/app.js" ]

