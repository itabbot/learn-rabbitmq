# 使用 Node.js 体验 RabbitMQ 的 “竞争消费者” 消息传递模式

竞争消费者模式（Competing Consumers Pattern），也称为工作队列模式（Work Queue Pattern），用于在多个消费者之间共享和处理消息。在竞争消费者模式中，有一个生产者将消息发布到队列中，然后多个消费者从队列中竞争性地接收和处理消息。每个消息只能被一个消费者处理，确保只被处理一次，避免重复处理。如下图所示：

![competing-consumers.png](./competing-consumers.png)

竞争消费者其实就是在点对点模式的基础上，多启动一些消费者。详见 [点对点模式>>](../point-to-point)