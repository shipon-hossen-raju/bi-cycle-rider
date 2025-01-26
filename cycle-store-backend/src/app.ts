import express, { Request, Response } from "express";
import appRouter from "./routes";

const app = express();

app.use(express.json());

app.use("/api/v1", appRouter);

// product routes
// app.use("/api/products", productRoute);

// orders routes
// app.use("/api/orders", orderRoute);

// default route or root route
app.get("/", (req: Request, res: Response) => {
  res.send("Cycle store backend server running");
});

export default app;
