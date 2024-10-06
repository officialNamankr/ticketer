import { Subjects, Publisher, PaymentCreatedEvent } from "@ticketer.com/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
