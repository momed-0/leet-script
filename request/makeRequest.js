const https = require("https");


function makeRESTAPIRequest(options,body) {
    return new Promise((resolve,reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', ()=> {
                try{
                    resolve(JSON.parse(data));
                } catch(err) {
                    console.log(data);
                }
            });
        });
        req.on('error',(error)=> {
            reject(error);
        });
        if(body) req.write(body);
        req.end();
    });
}




function makeGRAPHQLRequest(endpoint,options,requestBody) {
    return new Promise((resolve,reject) => {
        const req = https.request(endpoint,options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', ()=> {
                try{
                    resolve(JSON.parse(data));
                } catch(err) {
                    console.log(data);
                }
            });
        });
        req.on('error',(error)=> {
            reject(error);
        });
        req.write(requestBody);
        req.end();
    });
}

module.exports = {
    makeGRAPHQLRequest,
    makeRESTAPIRequest
}