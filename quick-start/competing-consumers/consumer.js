const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queue = 'queue_cc';
    await channel.assertQueue(queue);

    // 接收消息
    console.log('等待消息中...');
    channel.consume(queue, (msg) => {
        console.log('收到:', msg.content.toString());

        // 确认消息处理完成
        channel.ack(msg);
    });
})()
