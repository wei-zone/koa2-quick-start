## 拉取node镜像来打包koa项目 #
## https://hub.docker.com/_/node
## 使用官方 Node.js 轻量级镜像.
FROM node:18.12-alpine as build

## 定义工作目录
WORKDIR /app

## Copy application dependency manifests to the container image.
## A wildcard is used to ensure both package.json AND package-lock.json are copied.
## Copying this separately prevents re-running npm install on every code change.
## 将依赖定义文件拷贝到工作目录下
ADD package.json .

## Install production dependencies.
RUN npm install

ADD ./dist .

## 设置node的时区了 可能时间较长，耐心等待
## RUN apk update && apk add bash tzdata \ && cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

## 将3003端口暴露出来
EXPOSE 3003

## Run the web service on container startup.
## 5、 启动服务
CMD ["npm", "start"]
