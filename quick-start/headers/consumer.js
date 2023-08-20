const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_headers'
    await channel.assertExchange(exchange, 'headers')

    // 声明队列
    const queue = 'queue_headers';
    await channel.assertQueue(queue);

    // 设置匹配规则
    // x-match:all：这是头部交换模式中的特殊属性，它指定匹配规则的逻辑关系。'all' 表示所有的匹配规则都必须满足才会匹配成功
    // key1:value1 和 key2:value2 是自定义的头部匹配规则，意味着消息的头部属性中必须同时包含 key1 和 key2，并且它们的值必须分别为 'value1' 和 'value2'，才会匹配成功
    const headers = {'x-match': 'all', 'key1': 'value1', 'key2': 'value2'};

    // 绑定交换机和队列
    await channel.bindQueue(queue, exchange, '', headers);

    // 接收消息
    console.log('等待队列的消息...');
    await channel.consume(queue, (msg) => {
        console.log('收到队列消息:', msg.content.toString());
        channel.ack(msg); // 确认消息处理完成
    });
})()
