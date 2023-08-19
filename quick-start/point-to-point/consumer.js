const amqp = require('amqplib');

(async () => {
    // 连接RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    // 创建通道
    const channel = await connection.createChannel();

    // 声明队列。声明队列是幂等的，仅当队列尚不存在时才会创建它
    // 这里也声明了队列。因为我们可能会在发布者之前启动消费者，所以我们希望在尝试使用队列中的消息之前确保队列存在
    const queue = 'my_queue';
    await channel.assertQueue(queue, {durable: false});

    // 接收消息
    // 这是一个持续的操作，需要手动关闭通道才能退出程序
    console.log('等待消息中...');
    channel.consume(queue, (msg) => {
        const message = msg.content.toString();
        console.log('收到消息:', message);

        // 确认消息处理完成
        channel.ack(msg);
    });
})()
