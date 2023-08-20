const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_topic'
    await channel.assertExchange(exchange, 'topic')

    // 声明队列
    const {queue: queue1} = await channel.assertQueue('', {exclusive: true});
    const {queue: queue2} = await channel.assertQueue('', {exclusive: true});

    // 绑定交换机和队列
    // 绑定键也是一个由多个单词组成的字符串，单词之间使用点号（.）分隔
    // 可以使用两个特殊的通配符来进行模式匹配：
    //  *（星号）通配符： 匹配一个单词
    //  #（井号）通配符： 匹配零个或多个单词
    await channel.bindQueue(queue1, exchange, '*.orange.*');
    await channel.bindQueue(queue2, exchange, '*.*.rabbit');
    await channel.bindQueue(queue2, exchange, 'lazy.#');

    // 接收消息
    console.log('等待第一个队列的消息...');
    await channel.consume(queue1, (msg) => {
        console.log('收到第一个队列的消息:', msg.content.toString());
        channel.ack(msg); // 确认消息处理完成
    });
    console.log('等待第二个队列的消息...');
    await channel.consume(queue2, (msg) => {
        console.log('收到第二个队列的消息:', msg.content.toString());
        channel.ack(msg); // 确认消息处理完成
    });
})()
