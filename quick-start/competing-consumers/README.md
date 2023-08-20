# 使用 Node.js 体验 RabbitMQ 的 “竞争消费者” 消息传递模式

## 1. 概述

竞争消费者模式（Competing Consumers Pattern），也称为工作队列模式（Work Queue Pattern），用于在多个消费者之间共享和处理消息。在竞争消费者模式中，有一个生产者将消息发布到队列中，然后多个消费者从队列中竞争性地接收和处理消息。每个消息只能被一个消费者处理，确保只被处理一次，避免重复处理。如下图所示：

![竞争消费者模式.png](./competing-consumers.png)

## 2. 体验

竞争消费者模式其实就是在点对点模式的基础上，多启动一些消费者。参见 [点对点模式>>](../point-to-point)

1. 循环生产消息（[producer.js](producer.js)）

默认情况下，RabbitMQ 会将每条消息按顺序发送给消费者。平均而言，每个消费者都会收到相同数量的消息。这种分发消息的方式称为循环法。

```shell
$ node ./producer.js
第1条消息已发送
第2条消息已发送
第3条消息已发送
第4条消息已发送
第5条消息已发送
```

2. 启动两个消费者来消费消息（[consumer.js](consumer.js)）

```shell
$ node ./consumer.js
等待消息中...
收到: 第1条消息
收到: 第3条消息
收到: 第5条消息
```

```shell
$ node ./consumer.js
等待消息中...
收到: 第2条消息
收到: 第4条消息
收到: 第6条消息
```
