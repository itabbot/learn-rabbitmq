const amqp = require('amqplib');
const moment = require('moment');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queue = 'queue_prefetch';
    await channel.assertQueue(queue);

    // 每次预取2条消息
    await channel.prefetch(2)

    // 接收消息
    console.log('等待消息中...');
    channel.consume(queue, async (msg) => {
        console.log(`[${moment().format('HH:mm:ss')}] 收到消息:`, msg.content.toString());

        // 等待片刻
        await new Promise((resolve) => {
            setTimeout(() => resolve(), 2000)
        })

        // 确认消息处理完成
        channel.ack(msg);
    });
})()
