#### Stage 1: Build the react application
FROM node:14.18.1 

#### Create WORK Directory
WORKDIR /code

#### Copy Dependencies
COPY package.json /code/package.json
#### Install Dependencies
RUN npm install
#### copy to code
COPY . /code
EXPOSE 3000
#### Execute command
CMD [ "npm","start" ]

