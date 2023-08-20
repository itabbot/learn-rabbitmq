const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_direct'
    await channel.assertExchange(exchange, 'direct')

    // 声明队列
    const {queue: queue1} = await channel.assertQueue('', {exclusive: true});
    const {queue: queue2} = await channel.assertQueue('', {exclusive: true});

    // 绑定交换机和队列
    await channel.bindQueue(queue1, exchange, 'black');
    await channel.bindQueue(queue1, exchange, 'green');
    await channel.bindQueue(queue2, exchange, 'orange');

    // 接收消息
    console.log('等待第一个队列的消息...');
    await channel.consume(queue1, (msg) => {
        console.log('收到第一个队列的消息:', msg.content.toString());
        channel.ack(msg); // 确认消息处理完成
    });
    console.log('等待第二个队列的消息...');
    await channel.consume(queue2, (msg) => {
        console.log('收到第二个队列的消息:', msg.content.toString());
        channel.ack(msg); // 确认消息处理完成
    });
})()
