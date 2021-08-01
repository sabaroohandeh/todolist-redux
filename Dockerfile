FROM node:lts as builder

WORKDIR /app/
ADD package.json ./
RUN yarn

ADD . /app/
RUN yarn build

FROM hub.hamdocker.ir/staticdeploy/app-server:cra-runtime
COPY --from=0 /app/build /build
