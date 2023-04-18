const axios = require('axios');
const shell = require('shelljs')


class AllureApi {
    async isAllureProjectExist() {
        let result = false;
        const config = {
            method: 'get',
            url: 'http://localhost:5050/projects/search/',
            headers: { 'Content-Type': 'application/json' },
            params: {
                id: "ontego-traces"
            }
        }
    
        try {
            await axios(config)
            result =  true
        } catch (error) {
            result =  false
        }
        return result
    }
    
    async createAllureProject() {
        const config = {
            method: 'post',
            url: 'http://localhost:5050/projects',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: "ontego-traces"
            }
        }
    
        console.log(await this.isAllureProjectExist());
        if (!await this.isAllureProjectExist()) {
            console.log("----------CREATING PROJECT----------");
            await axios(config)
        }
    }
    
    async generateAllureReport(){
        const config = {
            method: 'get',
            url: 'http://localhost:5050/generate-report',
            headers: { 'Content-Type': 'application/json' },
            params: {
                project_id: "ontego-traces"
            }
        }
    
        console.log("----------GENERATE REPORT----------");
        await axios(config)
    }
}

module.exports = new AllureApi()

