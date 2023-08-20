# 使用 Node.js 体验 RabbitMQ 的 “直接交换” 路由模式

## 1. 概述

直接交换（Direct Exchange）是 RabbitMQ 中一种基本的路由模式，用于将消息根据精确的路由键（Routing Key）进行匹配和路由。 在直接交换模式中，消息的发送者将消息发布到直接交换机，并指定一个特定的路由键。直接交换机会将消息的路由键与队列绑定时指定的绑定键进行匹配，如果匹配成功，则将消息路由到对应的队列中。

与其他路由模式（如主题交换）不同的是，直接交换模式不使用通配符或模式匹配进行路由。它仅仅根据消息的路由键和队列的绑定键进行精确匹配。如图所示：

![直接交换路由.png](direct-exchange.png)

## 2. 体验

1. 生产消息（[producer.js](producer.js)）

```shell
$ node ./producer.js
消息已发布：orange、black、green、red
```

2. 消费消息（[consumer.js](consumer.js)）

```shell
$ node ./consumer.js
等待第一个队列的消息...
等待第二个队列的消息...
收到第二个队列的消息: orange
收到第一个队列的消息: black
收到第一个队列的消息: green
```
