const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_direct'
    await channel.assertExchange(exchange, 'direct')

    // 发布消息
    await channel.publish(exchange, 'orange', Buffer.from('orange'));
    await channel.publish(exchange, 'black', Buffer.from('black'));
    await channel.publish(exchange, 'green', Buffer.from('green'));
    await channel.publish(exchange, 'red', Buffer.from('red'));
    console.log('消息已发布：orange、black、green、red');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
