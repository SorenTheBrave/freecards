FROM node:18 as builder

RUN mkdir -p /src
RUN mkdir -p /build

WORKDIR /

ADD src/ /src
ADD *.json *.js *.ts /

# Also lint & test here at some point
RUN npm i
RUN npm run build

FROM node:18

RUN groupadd runners && useradd -G runners runner

RUN mkdir -p /home/runner/freecards/static

WORKDIR /home/runner

COPY --from=builder /build freecards

COPY server.js freecards/index.js

COPY package.json package-lock.json freecards/

COPY static freecards/static

RUN cd freecards && npm i

ENV PORT 443

EXPOSE 443

USER runner

ENTRYPOINT [ "node","freecards" ]