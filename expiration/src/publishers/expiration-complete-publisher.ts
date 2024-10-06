import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@ticketer.com/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
