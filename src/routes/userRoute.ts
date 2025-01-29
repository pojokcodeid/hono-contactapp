import { Hono } from "hono";
import UserController from "../controllers/UserController";
import AccessValidation from "../validations/AccessValidation";
const userRoute = new Hono();

userRoute.post("/users", UserController.createUser);
userRoute.post("/login", UserController.verifyUser);
userRoute.get("/refresh", UserController.refreshToken);
userRoute.use("/users/*", AccessValidation.validateAccessToken);
userRoute.put("/users/:id", UserController.updateUser);
userRoute.get("/users", UserController.getUsers);
userRoute.get("/users/:id", UserController.getUser);
userRoute.delete("/users/:id", UserController.deleteUser);

export default userRoute;
