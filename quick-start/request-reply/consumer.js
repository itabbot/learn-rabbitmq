const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明队列
    const queueReq = 'queue_rpc_req'
    await channel.assertQueue(queueReq);

    // 接收请求消息
    console.log('等待请求...');
    await channel.consume(queueReq, async (msg) => {
        console.log('收到请求:', msg.content.toString());

        // 等待片刻
        await new Promise((resolve) => {
            setTimeout(() => resolve(), 3000)
        })

        // 响应
        await channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from('响应消息'),
            {correlationId: msg.properties.correlationId}
        );
        console.log('响应请求成功');

        // 确认消息处理完成
        channel.ack(msg);
    });
})()
