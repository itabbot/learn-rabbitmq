const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queue = 'queue_ack';
    await channel.assertQueue(queue);

    // 消费选项
    // 设置为必须显式应答消息
    const option = {noAck: false}

    // 接收消息
    console.log('等待消息中...');
    channel.consume(queue, async (msg) => {
        console.log('收到消息:', msg.content.toString());

        // 不应答消息
    }, option);
})()
