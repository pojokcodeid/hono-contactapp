import { Hono } from "hono";
import AddressController from "../controllers/AddressController";
import AccessValidation from "../validations/AccessValidation";

const addressRoute = new Hono();

addressRoute.use("/address/*", AccessValidation.validateAccessToken);
addressRoute.post("/address", AddressController.createAddress);
addressRoute.put("/address/:id", AddressController.updateAddress);
addressRoute.get("/address", AddressController.getAllAddress);
addressRoute.get("/address/:id", AddressController.getAddressById);
addressRoute.get(
  "/address/personal/:id",
  AddressController.getAddressByPersonalId
);
addressRoute.delete("/address/:id", AddressController.deleteAddress);

export default addressRoute;
