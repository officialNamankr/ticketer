import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import cors from "cors";
import { errorHandler, NotFoundError, currentUser } from "@ticketer.com/common";

import { createTicketRouter } from "./routes/new";
import { showTickerRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTickerRouter } from "./routes/update";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);
app.use(cors());
app.use(createTicketRouter);
app.use(showTickerRouter);
app.use(indexTicketRouter);
app.use(updateTickerRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
