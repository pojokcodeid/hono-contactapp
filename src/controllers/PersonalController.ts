import { Context } from "hono";
import { validatePersonal } from "../validations/PersonalValidation";
import PerssonalModel from "../models/PerssonalModel";
import { Personal } from "@prisma/client";
import Log from "../utils/Logger";

class PersonalController {
  /**
   * Handles the creation of a new personal entry.
   *
   * This function parses the request body to retrieve personal details,
   * validates the parsed data, and creates a new personal record in the database.
   * It requires a valid user ID from the request context. If successful, it
   * returns a JSON response with a success message and the created personal data.
   * If an error occurs, it logs the error and returns an appropriate JSON response
   * with an error message.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async createPersonal(c: Context) {
    try {
      const data = await c.req.json();
      const { name } = await validatePersonal.parse(data);
      const userId = c.get("user_id");
      const personal = await PerssonalModel.create({
        name,
        userId,
      } as Personal);
      return c.json(
        {
          message: "Personal created successfully",
          data: personal,
        },
        201
      );
    } catch (error) {
      Log.error(
        "Error ./controllers/PersonalController.createPersonal " + error
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
   * Handles the update of an existing personal entry.
   *
   * This function parses the request body to retrieve personal details,
   * validates the parsed data, and updates an existing personal record in the
   * database. If successful, it returns a JSON response with a success message
   * and the updated personal data. If an error occurs, it logs the error and
   * returns an appropriate JSON response with an error message.
   *
   * @param c - The request context containing HTTP request and response objects.
   * @returns A JSON response with the success or error message and data.
   */
  async updatePersonal(c: Context) {
    try {
      const id = c.req.param("id");
      const data = await c.req.json();
      const { name } = await validatePersonal.parse(data);
      const userId = c.get("user_id");
      const personal = await PerssonalModel.update(Number(id), {
        name,
        userId,
      } as Personal);
      return c.json(
        {
          message: "Personal updated successfully",
          data: personal,
        },
        200
      );
    } catch (error) {
      Log.error(
        "Error ./controllers/PersonalController.updatePersonal " + error
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

  async getPersonal(c: Context) {
    try {
      const id = c.req.param("id");
      const personal = await PerssonalModel.findById(Number(id));
      if (!personal) {
        return c.json({ message: "Personal not found", data: null }, 404);
      }
      return c.json({ message: "Personal found", data: personal }, 200);
    } catch (error) {
      Log.error("Error ./controllers/PersonalController.getPersonal " + error);
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

  async getAllPersonal(c: Context) {
    try {
      const personals = await PerssonalModel.findAll();
      return c.json({ message: "Personal found", data: personals }, 200);
    } catch (error) {
      Log.error(
        "Error ./controllers/PersonalController.getAllPersonal " + error
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

  async deletePersonal(c: Context) {
    try {
      const id = c.req.param("id");
      const checkPersonal = await PerssonalModel.findById(Number(id));
      if (!checkPersonal) {
        return c.json({ message: "Personal not found", data: null }, 404);
      }
      const personalDeleted = await PerssonalModel.delete(Number(id));
      return c.json(
        { message: "Personal deleted successfully", data: personalDeleted },
        200
      );
    } catch (error) {
      Log.error(
        "Error ./controllers/PersonalController.deletePersonal " + error
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
}

export default new PersonalController();
