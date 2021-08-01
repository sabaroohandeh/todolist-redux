FROM node:lts 

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .
RUN yarn build

FROM staticdeploy/app-server:cra-runtime
COPY --from=0 /app/build /build
