FROM node

RUN apk add telnet -y
RUN apk add wget -y

RUN mkdir -p /opt/navsii-tools
RUN cd /opt/navsii-tools
RUN wget https://github.com/Zombitch/tools/archive/refs/heads/main.zip
RUN unzip main.zip && rm -f main.zip
RUN cd back
RUN npm i bcrypt
RUN npm i -D @types/bcrypt
RUN npm run start:dev
RUN npm i --save helmet
RUN npm install -g @nestjs/cli
RUN npm i --save @nestjs/config

EXPOSE 4000