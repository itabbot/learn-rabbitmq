const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    // 这里也声明了队列。因为我们可能会在发布者之前启动消费者，所以希望在使用队列之前确保队列存在
    const queue = 'queue_p2p';
    await channel.assertQueue(queue);

    // 接收消息
    // 这是一个持续的操作，需要手动关闭通道才能退出程序
    console.log('等待消息中...');
    channel.consume(queue, (msg) => {
        console.log('收到消息:', msg.content.toString());

        // 确认消息处理完成
        channel.ack(msg);
    });
})()
