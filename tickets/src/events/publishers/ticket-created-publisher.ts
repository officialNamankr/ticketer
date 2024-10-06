import { Publisher, Subjects, TicketCreatedEvent } from "@ticketer.com/common";

export class TicketCreatedPubliher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
