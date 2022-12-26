// NODE 16
'use strict';
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
  
// GET /////////// https://534gmkavqh.execute-api.us-east-1.amazonaws.com/default/1
exports.handler = async (event, context) => {
     const id = event.pathParameters.id;
    
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "keys",
        Key: {  
            id: id
        }
    }
    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    } catch(err) {
        responseBody = `Unable to get: ${err}`
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
               "Access-Control-Allow-Headers" : "Content-Type",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
           },
        body: responseBody
    };
    return response;
}

responseBody = {
    "Item": {
        "value": "06v...RBQTZd5",
        "id": "4",
        "key": "NYT_API"
    }
}
 
// POST https://2ubevlxtsi.execute-api.us-east-1.amazonaws.com/default/keys

exports.handler = async (event, context) => {
    const {id, key, value } = JSON.parse(event.body);
    
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "keys",  
        Item: { 
            id:id,
            value: key,
            key: value
        }
    }
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        console.log(data)
        statusCode = 201;
    } catch(err) {
        responseBody = `Unable to put: ${err}`
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
               "Access-Control-Allow-Headers" : "Content-Type",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
           },
        body: responseBody
    };
    return response;
}
 
  