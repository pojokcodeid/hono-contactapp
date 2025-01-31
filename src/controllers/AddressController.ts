import { Context } from "hono";
import { validateAddress } from "../validations/AddressValidation";
import Log from "../utils/Logger";
import AddressModel from "../models/AddressModel";
import { Address } from "@prisma/client";

class AddressController {
  /**
   * Handles the creation of a new address record.
   *
   * This function parses the request body to retrieve address details,
   * validates the parsed data, and creates a new address record in the database.
   * If successful, it returns a JSON response with a success message and the
   * created address data. If an error occurs, it logs the error and returns
   * an appropriate JSON response with an error message.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async createAddress(c: Context) {
    try {
      const body = await c.req.json();
      const { addressName, address, city, province, country, personalId } =
        await validateAddress.parse(body);
      const addressInserted = await AddressModel.create({
        addressName,
        address,
        city,
        province,
        country,
        personalId,
      } as Address);

      return c.json(
        { message: "Address created successfully", data: addressInserted },
        201
      );
    } catch (error) {
      Log.error("Error ./controllers/AddressController.createAddress " + error);
      if (error instanceof Error) {
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
    }
  }

  /**
   * Handles the update of an existing address record.
   *
   * This function parses the request body to retrieve address details,
   * validates the parsed data, and updates an existing address record in the
   * database. If successful, it returns a JSON response with a success message
   * and the updated address data. If an error occurs, it logs the error and
   * returns an appropriate JSON response with an error message.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async updateAddress(c: Context) {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const { addressName, address, city, province, country, personalId } =
        await validateAddress.parse(body);
      const addressUpdated = await AddressModel.update(Number(id), {
        addressName,
        address,
        city,
        province,
        country,
        personalId,
      } as Address);
      return c.json(
        { message: "Address updated successfully", data: addressUpdated },
        200
      );
    } catch (error) {
      Log.error("Error ./controllers/AddressController.updateAddress " + error);
      if (error instanceof Error) {
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
    }
  }

  /**
   * Retrieves all address records from the database.
   *
   * This function fetches all addresses and returns them in a JSON response.
   * If successful, it returns a 200 status with the list of addresses.
   * In case of an error, it logs the error and returns a JSON response with
   * an error message and a 400 or 500 status.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async getAllAddress(c: Context) {
    try {
      const address = await AddressModel.findAll();
      return c.json({ message: "Address found", data: address }, 200);
    } catch (error) {
      Log.error("Error ./controllers/AddressController.getAllAddress " + error);
      if (error instanceof Error) {
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
    }
  }

  /**
   * Retrieves an address record by its ID from the database.
   *
   * This function fetches an address by its ID and returns it in a JSON response.
   * If successful, it returns a 200 status with the address data.
   * In case of an error, it logs the error and returns a JSON response with
   * an error message and a 400 or 500 status.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async getAddressById(c: Context) {
    try {
      const id = c.req.param("id");
      const address = await AddressModel.findById(Number(id));
      return c.json({ message: "Address found", data: address }, 200);
    } catch (error) {
      Log.error(
        "Error ./controllers/AddressController.getAddressById " + error
      );
      if (error instanceof Error) {
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
    }
  }

  async getAddressByPersonalId(c: Context) {
    try {
      const id = c.req.param("id");
      const address = await AddressModel.findByPersonalId(Number(id));
      return c.json({ message: "Address found", data: address }, 200);
    } catch (error) {
      Log.error(
        "Error ./controllers/AddressController.getAddressByPersonalId " + error
      );
      if (error instanceof Error) {
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
    }
  }

  /**
   * Deletes an address record by its ID from the database.
   *
   * This function takes the address ID as a route parameter, deletes the address
   * record from the database, and returns a JSON response with a success message
   * and the deleted address data. If an error occurs, it logs the error and
   * returns an appropriate JSON response with an error message.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async deleteAddress(c: Context) {
    try {
      const id = c.req.param("id");
      const addressDeleted = await AddressModel.delete(Number(id));
      return c.json(
        { message: "Address deleted successfully", data: addressDeleted },
        200
      );
    } catch (error) {
      Log.error("Error ./controllers/AddressController.deleteAddress " + error);
      if (error instanceof Error) {
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
    }
  }
}

export default new AddressController();
