import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  OrderStatus,
} from "@ticketer.com/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      status: data.status,
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
    });

    await order.save();

    msg.ack();
  }
}
