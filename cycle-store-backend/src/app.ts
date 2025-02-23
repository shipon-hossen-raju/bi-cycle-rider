import express, { Request, Response } from "express";
import appRouter from "./routes";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bi-cycle-rider.vercel.app"],
    credentials: true,
  }),
);

app.use("/api/v1", appRouter);

// default route or root route
app.get("/", (req: Request, res: Response) => {
  res.send("Cycle store backend server running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
