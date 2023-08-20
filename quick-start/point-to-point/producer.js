const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    // 声明队列是幂等的，仅当队列尚不存在时才会创建它
    const queue = 'queue_p2p';
    await channel.assertQueue(queue);

    // 发送消息
    await channel.sendToQueue(queue, Buffer.from('Hello, RabbitMQ!'));
    console.log('消息已发送');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
