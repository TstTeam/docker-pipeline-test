const AllureReporter = require('./AllureReport');
const fs = require('fs');

function randomString(length = 5, lettersOnly = false) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const allowedChars = lettersOnly ? letters : `${letters}${numbers}`;

    return Array(length)
        .join()
        .split(',')
        .map(() => allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)))
        .join('');
}

class Reporter {
    async changeTitleStep(valueToChange){
        await AllureReporter.changeStep(valueToChange);
    }

    /**
     * Close step in report
     */
    async closeStep(isFailed) {
        let screenshotFilePath;
        if (isFailed) {
            screenshotFilePath = './test/support/reports' + `/${randomString(10)}.png`;
            await browser.saveScreenshot(screenshotFilePath);
        }
        const pageSource = await browser.getPageSource();
        await AllureReporter.closeStep(isFailed, pageSource);
        if (isFailed) {
            fs.unlinkSync(screenshotFilePath);
        }
    }

     /**
     * Log message
     * console log with green color text
     * @param msg text to log
     */
    async step(msg) {
        // await ConsoleReport.step(msg);
        await AllureReporter.step(msg);
    }

    async startStep(stepTitle) {
        await AllureReporter.startStep(stepTitle)
    }

    async endStep(testStatus) {
        await AllureReporter.endStep(testStatus);
    }

    async debug(msg) {
        await AllureReporter.addLogEntry('[REQUEST]', msg);
    }

    async checker(msg) {
        await AllureReporter.addLogEntry('[CHECK]', msg);
    }

    async warn(msg) {
        await AllureReporter.addLogEntry('[WARNING]', msg);
    }

    async error(msg) {
        await AllureReporter.addLogEntry('[ERROR]', msg);
    }
}
module.exports = new Reporter();