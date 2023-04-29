var cron = require('node-cron');
var shell = require('shelljs');


cron.schedule('* * * * *', async () => {
    await shell.rm('-rf', 'allure-results');
    await shell.exec("npm run test")
});