const { randomUUID } = require('crypto');
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ region: process.env.REGION });
const QUEUE_URL = process.env.PENDING_ORDER_QUEUE;

module.exports.pedido = async (event) => {
  console.log('Procesando pedido');
  let orderId = randomUUID();

  const body = JSON.parse(event.body);
  
  const order = {
		orderId,
		name: body.name,
		address: body.address,
		pizzas: body.pizzas,
		timestamp: Date.now()
	};

  const params = {
    MessageBody: JSON.stringify(order),
    QueueUrl: QUEUE_URL
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    
    const message = {
      order,
      messageId: data.MessageId
    };

    return {
      statusCode: 200,
      body: JSON.stringify(message),
    };
  } catch (err) {
    console.error('Error enviando mensaje a SQS:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo procesar el pedido' }),
    };
  }
};