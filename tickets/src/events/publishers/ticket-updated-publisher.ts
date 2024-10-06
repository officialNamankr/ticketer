import { Subjects, Publisher, TicketUpdatedEvent } from "@ticketer.com/common";

export class TicketUpdatedPubliher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
