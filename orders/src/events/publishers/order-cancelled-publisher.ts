import { Publisher, OrderCancelledEvent, Subjects } from "@ticketer.com/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
