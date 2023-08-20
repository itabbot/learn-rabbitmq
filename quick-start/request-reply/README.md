# 使用 Node.js 体验 RabbitMQ 的 “请求/回复” 消息传递模式

## 1. 概述

请求/回复（Request/Reply）消息传递模式，用于实现请求和响应之间的双向通信。在该模式中，一个发送者发送请求消息，而一个接收者接收并发送回应消息。如下图所示：

![请求/回复模式.png](request-reply.png)

## 2. 体验

1. 生产消息（[producer.js](producer.js)）

```shell
$ node ./producer.js
已发起请求
收到响应: 响应消息
```

2. 消费消息（[consumer.js](consumer.js)）

```shell
$ node ./consumer.js
等待请求...
收到请求: 请求消息
响应请求成功
```
