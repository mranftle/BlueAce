FROM ubuntu:latest

# update packages
RUN apt-get update

#Install curl & git
RUN apt-get -qq -y install curl

#install nodejs and angular cli
RUN curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -yqq nodejs

RUN npm install -g http-server

RUN mkdir dist
COPY dist/ dist
CMD http-server ./dist -p 4200
