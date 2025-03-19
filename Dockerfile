FROM node:22-alpine

# install pnpm

RUN npm install -g pnpm

# create app directory
WORKDIR /usr/src/app

# fetch dependencies for generate cache
COPY pnpm-lock.yaml ./

RUN pnpm fetch

# copy source code
ADD . ./

# install dependencies offline with cache of pnpm fetch
RUN pnpm install -r --offline --frozen-lockfile

# build app
RUN pnpm run build

ENV NODE_ENV=production

CMD ["pnpm", "start", "--", "--port", "5000"]

