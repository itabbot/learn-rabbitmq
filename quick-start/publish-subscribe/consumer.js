const amqp = require('amqplib');

(async () => {
    // 建立连接
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // 声明交换机
    const exchange = 'exchange_fanout'
    await channel.assertExchange(exchange, 'fanout')

    // 声明队列
    // 提供空字符串形式的队列名称时，会生成随机队列名称，例如：amq.gen-JzTY20BRgKO-HjmUJj0wLg
    // 使用 exclusive:true 选项时，连接关闭时队列将被删除
    const {queue} = await channel.assertQueue('', {exclusive: true});

    // 绑定交换机和队列
    // 如果还没有队列绑定到交换机，发布的消息将会丢失
    // fanout 类型的交换机会忽略绑定模式
    await channel.bindQueue(queue, exchange, '');

    // 接收消息
    console.log('等待消息中...');
    await channel.consume(queue, (msg) => {
        console.log('收到:', msg.content.toString());

        // 确认消息处理完成
        channel.ack(msg);
    });
})()
