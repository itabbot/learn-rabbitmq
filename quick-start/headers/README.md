# 使用 Node.js 体验 RabbitMQ 的 “头部交换” 路由模式

## 1. 概述

头部交换（Headers Exchange）是 RabbitMQ 中一种路由模式，它使用消息的头部属性进行匹配和路由消息，而不使用路由键。 在头部交换模式中，消息的发送者可以在消息的头部属性中附加一组键值对（Headers）并将消息发布到头部交换器，并指定一组匹配规则，这些规则包含要匹配的头部属性及其对应的值。 头部交换器会根据消息的头部属性与队列绑定时指定的匹配规则进行匹配，如果匹配成功，则将消息路由到对应的队列中。

## 2. 体验

1. 生产消息（[producer.js](producer.js)）

```shell
$ node ./producer.js
消息已发布：hello1、hello2
```

2. 消费消息（[consumer.js](consumer.js)）

```shell
$ node ./consumer.js
等待队列的消息...
收到队列消息: hello1
```
