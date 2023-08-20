const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queueNotDurable = 'queue_not_durable';
    const queueDurable = 'queue_durable';
    await channel.assertQueue(queueNotDurable, {durable: false});
    await channel.assertQueue(queueDurable, {durable: true});
    console.log('声明持久化队列：', queueDurable);
    console.log('声明非持久化队列：', queueNotDurable);

    // 发送消息
    for (let i = 0; i < 10; i++) {
        const msg = Buffer.from(Date.now().toString())
        channel.sendToQueue(queueNotDurable, msg, {persistent: false});
        channel.sendToQueue(queueNotDurable, msg, {persistent: true});
        channel.sendToQueue(queueDurable, msg, {persistent: false});
        channel.sendToQueue(queueDurable, msg, {persistent: true});
    }
    console.log('成功向两个队列发送 10 条持久化消息');
    console.log('成功向两个队列发送 10 条非持久化消息');

    // 关闭连接
    await channel.close();
    await connection.close();
})()
