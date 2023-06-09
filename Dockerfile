FROM node:16
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "start","test" ]
# test the routes with yarn test

