import { Hono } from "hono";
import AccessValidation from "../validations/AccessValidation";
import PersonalController from "../controllers/PersonalController";

const personalRoute = new Hono();

personalRoute.use("/personal/*", AccessValidation.validateAccessToken);
personalRoute.post("/personal", PersonalController.createPersonal);
personalRoute.put("/personal/:id", PersonalController.updatePersonal);
personalRoute.get("/personal/user", PersonalController.getPersonalByUserId);
personalRoute.get("/personal/:id", PersonalController.getPersonal);
personalRoute.get("/personal", PersonalController.getAllPersonal);
personalRoute.delete("/personal/:id", PersonalController.deletePersonal);

export default personalRoute;
