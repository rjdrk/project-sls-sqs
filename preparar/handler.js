const orderMetadataManager = require('./orderMetadataManager');

module.exports.prepararPedido = (event, context, callback) => {
  console.log(JSON.parse(event.Records[0].body));

  let order = JSON.parse(event.Records[0].body);
  let orderId = order.orderId;
	
  console.log(`Pedido No. ${orderId} fue enviado a cocina`);

	orderMetadataManager
		.saveCompletedOrder(order)
		.then(data => {
			callback();
		})
		.catch(error => {
			callback(error);
		});
};