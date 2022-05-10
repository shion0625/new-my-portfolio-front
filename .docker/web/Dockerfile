FROM node:14.18.1-alpine

RUN apk update \
  && apk upgrade
RUN  apk add --no-cache git python3 make g++ gcc
RUN  apk add --no-cache curl
RUN  curl -o- -L https://yarnpkg.com/install.sh | sh
RUN  yarn add @vue/cli @vue/cli-service-global nuxt create-nuxt-app

ENV TZ Asia/Tokyo
ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

WORKDIR /app

CMD ["/bin/ash"]
