FROM ianwalter/puppeteer:latest

WORKDIR /app/wdio/
ADD . /app/wdio/

RUN npm install

CMD npm run test; node worker/run_scheduler.js 