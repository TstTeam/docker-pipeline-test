const Axios = require("axios");
const fs = require("fs-extra");

async function ls(path) {
    const dir = await fs.promises.readdir(path)
    var objAll = []
    for (const dirent of dir) {
        const readFileText = await fs.promises.readFile(path + dirent)
        const covertToBase64 = Buffer.from(readFileText).toString("base64");
        let obj64 = { 'file_name': dirent, 'content_base64': covertToBase64 }
        objAll.push(obj64);
    } 
    return objAll
}

async function allureSendResults() {
    var objFinal = await ls('allure-results/');
    await Axios(
        {
            method: "post",
            url: `${process.env.ALLURE_SERVICE_URL}/send-results`, 
            headers:{ 'Content-Type':'application/json' },
            params:{
                'project_id': process.env.PROJECT_ID,
                'force_project_creation': true
            },
            data:{ 
                "results": objFinal 
            }
        }).then(() => { console.log("----Sending Results----"); }).catch((error) => { console.log("There was an error:", error); });
}

async function allureGenerateReport() {
    await Axios(
        {
            method: "get",
            url: `${process.env.ALLURE_SERVICE_URL}/generate-report`,
            headers: { 'Content-Type': 'application/json' },
            params: { 
                'project_id': process.env.PROJECT_ID
            }
        }).then(() => { console.log("----Generate Report----"); }).catch((error) => { console.log("There was an error:", error); });
}

async function allureReport() { 
    await allureSendResults(); 
    await allureGenerateReport(); 
} 

allureReport();