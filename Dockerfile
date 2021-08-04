FROM node:lts as builder

WORKDIR /app/
RUN yarn add PACKAGE

FROM hub.hamdocker.ir/staticdeploy/app-server:cra-runtime
COPY --from=0 /app/build /build
