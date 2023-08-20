const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queue = 'queue_prefetch';
    await channel.assertQueue(queue);

    // 发送消息
    for (let i = 0; i < 6; i++) {
        channel.sendToQueue(queue, Buffer.from(`消息${i + 1}`));
    }
    console.log('已发送6条消息');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
