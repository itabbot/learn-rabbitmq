# 使用 Node.js 体验 RabbitMQ 的 “发布/订阅” 消息传递模式

## 1. 概述

发布订阅模式（Publish-Subscribe Pattern）用于实现消息的广播和多播。在该模式中，消息的发布者将消息发布到交换机，交换机则将收到的消息复制并广播给所有与之绑定的队列。如下图所示：

![发布订阅模式.png](publish-subscribe.png)

## 2. 体验

1. 生产消息（[producer.js](producer.js)）

```shell
$ node ./producer.js
第1条消息已发布到交换机
第2条消息已发布到交换机
第3条消息已发布到交换机
```

2. 启动两个消费者来消费消息（[consumer.js](consumer.js)）

```shell
$ node ./consumer.js
等待消息中...
收到: 第1条消息
收到: 第2条消息
收到: 第3条消息
```

```shell
$ node ./consumer.js
等待消息中...
收到: 第1条消息
收到: 第2条消息
收到: 第3条消息
```
