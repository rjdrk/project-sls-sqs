const aws = require("aws-sdk");

let dynamoDBClientParams = {}
const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const verPedido = async (event, context) => {
    console.log("event -> ",JSON.stringify(event));

    let orderId = event.pathParameters.id;

    const params = {
        ExpressionAttributeValues: {
          ":orderId": orderId
        },
        KeyConditionExpression: "orderId = :orderId",
        TableName: "CompletedOrderTable",
    };
    
    return dynamodb.query(params).promise().then(res => {
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'pedido': res.Items})
        }
    })
}

module.exports = {
    verPedido
}