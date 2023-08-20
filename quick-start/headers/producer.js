const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_headers'
    await channel.assertExchange(exchange, 'headers')

    // 发布消息
    await channel.publish(exchange, '', Buffer.from('hello1'), {
        headers: {'key1': 'value1', 'key2': 'value2'} // 设置消息头部属性
    });
    await channel.publish(exchange, '', Buffer.from('hello2'), {
        headers: {'key3': 'value3'} // 设置消息头部属性
    });
    console.log('消息已发布：hello1、hello2');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
