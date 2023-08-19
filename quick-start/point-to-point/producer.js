const amqp = require('amqplib');

(async () => {
    // 连接RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    // 创建通道
    const channel = await connection.createChannel();

    // 声明队列。声明队列是幂等的，仅当队列尚不存在时才会创建它
    const queue = 'my_queue';
    await channel.assertQueue(queue, {durable: false});

    // 发送消息
    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queue, Buffer.from(message));
    console.log('消息已发送:', message);

    // 关闭连接
    await channel.close();
    await connection.close();
})()
