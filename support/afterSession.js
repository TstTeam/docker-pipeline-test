const shell = require('shelljs')
const fs = require('fs');
const path = require('path');
const reportApi = require('../send_reports');

async function afterSesion() {
    const EXTENSION = '.xml';
        let length = 0
        while (length == 0) {
            try {
                let files = fs.readdirSync(`allure-results/`);
                let targertfile = files.filter(file => {
                    return path.extname(file).toLowerCase() === EXTENSION;
                });
                length = targertfile.length
            } catch (error) {
                throw Error('Unable to scan allure-results directory: ' + error)
            }
        }

        await shell.exec('sh generate-allure.sh')

        await reportApi.generateAllureReport()
}
afterSesion();