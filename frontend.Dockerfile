# base node image
FROM node:16.13-alpine AS base
ENV YARN_CACHE_FOLDER=.yarn-cache
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add turbo typescript ts-node
WORKDIR /app


FROM base AS pruner
COPY . .
RUN turbo prune --scope=frontend --docker


FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install


FROM base AS sourcer
ENV NODE_ENV=production
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
RUN turbo run build --scope=frontend 
CMD [ "yarn","start" ]
