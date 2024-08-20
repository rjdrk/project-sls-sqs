module.exports.prepararPedido = (event, context, callback) => {
  console.log(JSON.parse(event.Records[0].body));

  let params = JSON.parse(event.Records[0].body);
  let orderId = params.orderId;
	
  console.log(`Pedido no ${orderId} fue enviado al cocina`);

	callback();
};