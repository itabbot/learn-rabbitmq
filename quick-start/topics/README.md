# 使用 Node.js 体验 RabbitMQ 的 “主题” 消息传递模式

## 1. 概述

主题模式（Topic Pattern）是基于主题交换器（Topic Exchange）的消息路由机制，用于实现高度动态的消息路由和过滤。它使用模式匹配的方式将消息路由到感兴趣的队列，如下图所示：

![主题模式.png](topics.png)

## 2. 体验

1. 生产消息（[producer.js](producer.js)）

```shell
$ node ./producer.js
消息已发布
```

2. 消费消息（[consumer.js](consumer.js)）

```shell
$ node ./consumer.js
等待第一个队列的消息...
等待第二个队列的消息...
收到第二个队列的消息: quick.orange.rabbit
收到第一个队列的消息: quick.orange.rabbit
收到第二个队列的消息: lazy.orange.elephant
收到第二个队列的消息: lazy.brown.fox
收到第一个队列的消息: lazy.orange.elephant
收到第二个队列的消息: lazy.pink.rabbit
```
