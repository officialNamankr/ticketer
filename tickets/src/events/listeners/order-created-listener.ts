import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@ticketer.com/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPubliher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find the ticket the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //If no ticket throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    //Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    //save the ticket
    await ticket.save();
    await new TicketUpdatedPubliher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    //ack the message
    msg.ack();
  }
}
