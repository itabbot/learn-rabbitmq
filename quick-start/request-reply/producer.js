const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queueReq = 'queue_rpc_req'
    const queueRes = 'queue_rpc_res'
    await channel.assertQueue(queueReq);
    await channel.assertQueue(queueRes);

    // 生成请求ID
    const correlationId = Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();

    // 接收响应
    channel.consume(queueRes, function (msg) {
        // 请求ID匹配的，才是对应的响应消息
        if (msg.properties.correlationId === correlationId) {
            console.log('收到响应:', msg.content.toString());
            setTimeout(() => process.exit(0), 500);
        }
        // 确认消息处理完成
        channel.ack(msg);
    });

    // 发布消息（发起请求）
    channel.sendToQueue(
        queueReq,
        Buffer.from('请求消息'),
        {
            correlationId: correlationId, // 标记请求ID
            replyTo: queueRes, // 指定接收响应消息的队列
        }
    );
    console.log('已发起请求');
})()
