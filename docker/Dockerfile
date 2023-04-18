FROM ianwalter/puppeteer:latest

WORKDIR /app/wdio/
ADD . /app/wdio/

RUN npm install

CMD curl npm run test; sh generate-allure.sh