const allureReporter = require('@wdio/allure-reporter').default;

/**
 * Custom command for use with wdio-allure-reporter
 */
class CustomCommand {
    title;
    bodyLabel;
    body;
    constructor(title, bodyLabel, body) {
        this.title = title;
        this.body = `${body}`;
        this.bodyLabel = bodyLabel;
    }
    appendToBody(msg) {
        this.body += `${msg} \n`
    }
}


class AllureReporter {

    constructor() {
        this.customCommand;
        this.isStepClosed = true;
        this.currentStepTitle = "";
    }

    async changeStep(textValue){
        this.customCommand.title = textValue;
    }

    /**
    * Close step in report
    */
    async closeStep(
        isFailed,
        pageSource,
    ) {
        if (isFailed) {
            await allureReporter.addAttachment('Page HTML source', pageSource, 'text/plain');
        }
        if (!this.isStepClosed) {
            await this.sendCustomCommand(this.customCommand, isFailed ? 'failed' : 'passed');
            this.isStepClosed = true;
        }
    }

    /**
    * Log step message
    * console log with green color text
    * @param msg text to log
    */
    async step(msg) {
        await this.closeStep(false, undefined);

        this.currentStepTitle = `[STEP] - ${msg}`;
        this.isStepClosed = false;

        this.customCommand = new CustomCommand(this.currentStepTitle, 'more info', '');
        // await this.customCommand.appendToBody(this.prettyMessage('[STEP]', msg));
    }

    /**
     * Add log entry for allure reporter
     * @param logType logType
     * @param msg message
     */
    async addLogEntry(logType, msg) {
        if (!this.isStepClosed) {
            this.customCommand.appendToBody(this.prettyMessage(logType, msg));
        } else {
            this.customCommand = new CustomCommand(`${logType} - ${msg}`, 'more info', this.prettyMessage(logType, msg));
            await this.sendCustomCommand(this.customCommand);
        }
    }

    /**
     * Adding custom command to allure reporter
     * @param command command to add
     * @param stepStatus status of steps
     */
    async sendCustomCommand(command, stepStatus) {
        let status = 'passed';
        if (stepStatus !== undefined) {
            status = stepStatus;
        }
        const stepContent = {
            content: command.body,
            name: command.bodyLabel,
        };
        await allureReporter.addStep(command.title, stepContent, status);
    }

    async startStep(stepTiitle) {
        await this.closeStep(false, undefined);
        await allureReporter.startStep(stepTiitle);
    }

    async endStep(endStatus){
        await this.closeStep(false, undefined);
        await allureReporter.endStep(endStatus);
    }

     /**
     * Message with type stamp, log type and test name
     * @param logLevel message level info/error/warning/debug
     * @param msg text to log
     */
    prettyMessage(logLevel, msg) {
        const dateString = this.getDate();
        return `${dateString} ${logLevel} ${msg}`;
    }

    /**
     * Date for log message
     */
    getDate() {
        return new Date()
            .toISOString() // will return like '2012-11-04T14:51:06.157Z'
            .replace(/T/, ' ') // replace T with a space
            .replace(/\..+/, ''); // delete the dot and everything after
    }
}
module.exports = new AllureReporter();