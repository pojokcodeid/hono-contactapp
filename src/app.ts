import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoute from "./routes/userRoute";
import Log from "./utils/Logger";
import addressRoute from "./routes/addressRoute";

const app = new Hono();

app.use("*", cors());
app.route("/api", userRoute);
app.route("/api", addressRoute);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
// Global error handler
app.onError((err, c) => {
  Log.error("Unhandled error", { error: err.message, stack: err.stack });
  return c.text("Internal Server Error", 500);
});

export default app;
