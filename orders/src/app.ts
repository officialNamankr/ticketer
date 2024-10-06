import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import cors from "cors";
import { errorHandler, NotFoundError, currentUser } from "@ticketer.com/common";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
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
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
