const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queue = 'queue_cc';
    await channel.assertQueue(queue);

    // 循环生产消息
    for (let i = 1; i <= 1000; i++) {
        await channel.sendToQueue(queue, Buffer.from(`第${i}条消息`));
        console.log(`第${i}条消息已发送`);

        // 等待一会
        await new Promise((resolve) => {
            setTimeout(() => resolve(), 1000)
        })
    }
})()
