const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    // 使用 fanout（扇出）类型，交换机会将收到的消息复制并广播给所有与之绑定的队列
    const exchange = 'exchange_fanout'
    await channel.assertExchange(exchange, 'fanout')

    // 循环发布消息
    for (let i = 1; i <= 3; i++) {
        // fanout 类型的交换机会忽略发布消息时的路由键
        await channel.publish(exchange, '', Buffer.from(`第${i}条消息`));
        console.log(`第${i}条消息已发布到交换机`);
    }

    // 关闭连接
    await channel.close();
    await connection.close();
})()
