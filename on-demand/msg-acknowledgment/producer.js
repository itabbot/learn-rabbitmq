const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queue = 'queue_ack';
    await channel.assertQueue(queue);

    // 发送消息
    channel.sendToQueue(queue, Buffer.from('Hello'));
    console.log('消息已发送：Hello');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
