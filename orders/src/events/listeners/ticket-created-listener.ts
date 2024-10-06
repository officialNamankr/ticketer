import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@ticketer.com/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { title, price } = data;
    const ticket = Ticket.build({
      id: data.id,
      title: title,
      price: price,
    });
    await ticket.save();
    msg.ack();
  }
}
