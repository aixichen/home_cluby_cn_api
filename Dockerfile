FROM node:8.11.3-alpine

MAINTAINER mandarava

ADD ./ /api/

WORKDIR /api

RUN npm i --registry=https://registry.npm.taobao.org

EXPOSE 7001

CMD ["npm","start"]

# sudo docker pull registry.cn-hangzhou.aliyuncs.com/mandarava/home-api-docker:1.0.1
# docker run -p 7001:7001 -d registry.cn-hangzhou.aliyuncs.com/mandarava/home-api-docker:1.0.1

#sudo docker run -it registry.cn-hangzhou.aliyuncs.com/mandarava/home-api-docker:1.0.1 /bin/sh 进入容器