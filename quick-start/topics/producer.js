const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_topic'
    await channel.assertExchange(exchange, 'topic')

    // 发布消息
    // 路由键（Routing Key）要求是多个单词组成的字符串，单词之间使用点号（.）分隔
    // 路由键中可以有任意多个单词，最多 255 个字节
    await channel.publish(exchange, 'quick.orange.rabbit', Buffer.from('quick.orange.rabbit'));
    await channel.publish(exchange, 'lazy.orange.elephant', Buffer.from('lazy.orange.elephant'));
    await channel.publish(exchange, 'lazy.brown.fox', Buffer.from('lazy.brown.fox'));
    await channel.publish(exchange, 'lazy.pink.rabbit', Buffer.from('lazy.pink.rabbit'));
    await channel.publish(exchange, 'quick.brown.fox', Buffer.from('quick.brown.fox'));
    console.log('消息已发布');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
