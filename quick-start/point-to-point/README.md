# 使用 Node.js 体验 RabbitMQ 的 “点对点” 消息传递模式

使用点对点模式（Point-to-Point），可以实现一对一的消息传递。在点对点模式中，有两个角色：生产者（Producer）和消费者（Consumer）。生产者负责发送消息到队列，而消费者则从队列中接收并处理消息。如下图所示：

![point-to-point.png](./point-to-point.png)

详见代码示例： [producer.js](producer.js)、[consumer.js](consumer.js)
