import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorMessage = (
  c: Context,
  error: HTTPException | Error | unknown
) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message, data: null }, error.status);
  } else if (error instanceof Error) {
    let message = error.message;
    try {
      message = JSON.parse(error.message)[0].message;
    } catch {
      message = error.message;
    }
    return c.json({ message, data: null }, 400);
  } else {
    return c.json({ message: "Internal Server Error", data: null }, 500);
  }
};
