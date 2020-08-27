FROM node:14.7-slim as base
LABEL org.opencontainers.image.authors=vincentbollaert@gmail.com
LABEL org.opencontainers.image.title="get-shit-done webapp"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.bretfisher.nodeversion=$NODE_VERSION

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

ENV NODE_ENV=production
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci && npm cache clean --force
EXPOSE 3002



FROM base as dev
ENV NODE_ENV=development
RUN npm i --only=development
CMD ["webpack-dev-server", "--config", "webpack.dev.js"]



FROM dev as test
COPY . .
# run tests



FROM test as pre-prod
COPY webpack.common.js ./
COPY webpack.prod.js ./
RUN webpack --config webpack.prod.js



FROM nginx as prod
COPY --from=pre-prod /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
