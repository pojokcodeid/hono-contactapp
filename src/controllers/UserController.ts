import { Context } from "hono";
import {
  loginValidation,
  validateNoPasswordUser,
  validateUser,
} from "../validations/UserValidation";
import Log from "../utils/Logger";
import UserModel from "../models/UserModel";
import { User } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/Jwt";

class UserController {
  /**
   * Handles the creation of a new user.
   *
   * @param c - The request context containing the HTTP request and response objects.
   *
   * @returns A JSON response indicating the result of the user creation process.
   *          On success, returns a 201 status with the created user data.
   *          On validation or internal errors, returns a 400 or 500 status with an error message.
   *
   * @throws Returns a JSON response with an error message if validation fails or
   *         an unexpected error occurs during user creation.
   */

  async createUser(c: Context) {
    try {
      const data = await c.req.json();
      const { name, email, password } = await validateUser.parse(data);
      const userInserted = await UserModel.create({
        name,
        email,
        password,
      } as User);
      return c.json(
        {
          message: "User created successfully",
          data: userInserted,
        },
        201
      );
    } catch (error) {
      Log.error("Error ./controllers/UserController.createUser " + error);
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
   * Handles the update of an existing user.
   *
   * @param c - The request context containing the HTTP request and response objects.
   *
   * @returns A JSON response indicating the result of the user update process.
   *          On success, returns a 200 status with the updated user data.
   *          On validation or internal errors, returns a 400 or 500 status with an error message.
   *
   * @throws Returns a JSON response with an error message if validation fails or
   *         an unexpected error occurs during user update.
   */
  async updateUser(c: Context) {
    try {
      const id = c.req.param("id");
      const data = await c.req.json();
      const { name, email, password } =
        await validateNoPasswordUser.parse(data);
      const checkUser = await UserModel.findById(Number(id));
      // check user existing
      if (!checkUser) {
        return c.json({ message: "User not found", data: null }, 404);
      }
      // check email existing
      const checkEmail = await UserModel.findByEmail(email);
      if (checkEmail && checkEmail.id !== Number(id)) {
        return c.json({ message: "Email already exists", data: null }, 400);
      }
      // process update
      const userUpdated = await UserModel.update(Number(id), {
        name,
        email,
        password,
      } as User);
      return c.json(
        {
          message: "User updated successfully",
          data: userUpdated,
        },
        200
      );
    } catch (error) {
      Log.error("Error ./controllers/UserController.updateUser " + error);
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
   * Retrieves all user records from the database.
   *
   * @returns A JSON response with a 200 status and a list of user objects.
   *          On internal errors, returns a JSON response with an error message
   *          and a 400 or 500 status.
   *
   * @throws Returns a JSON response with an error message if an unexpected
   *         error occurs during user retrieval.
   */
  async getUsers(c: Context) {
    try {
      const users = await UserModel.findAll();
      return c.json({ message: "Users found", data: users }, 200);
    } catch (error) {
      Log.error("Error ./controllers/UserController.getUsers " + error);
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
   * Retrieves a user record by its ID from the database.
   *
   * @returns A JSON response with a 200 status and the user object if found.
   *          On internal errors, returns a JSON response with an error message
   *          and a 400 or 500 status.
   *
   * @throws Returns a JSON response with an error message if an unexpected
   *         error occurs during user retrieval.
   */
  async getUser(c: Context) {
    try {
      const id = c.req.param("id");
      const user = await UserModel.findById(Number(id));
      if (!user) {
        return c.json({ message: "User not found", data: null }, 404);
      }
      return c.json({ message: "User found", data: user }, 200);
    } catch (error) {
      Log.error("Error ./controllers/UserController.getUser " + error);
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
   * Handles the verification of a user's credentials and login process.
   *
   * This function parses the request body to extract the email and password,
   * verifies the user's existence, and authenticates the user credentials.
   * If successful, it generates and returns access and refresh tokens along
   * with the user data in a JSON response. In cases where the user is not
   * found or the credentials are invalid, it returns an appropriate JSON
   * response with an error message.
   *
   * @param c - The request context containing the HTTP request and response objects.
   * @returns A JSON response with the login success message, user data, and tokens,
   *          or an error message if the user is not found or an error occurs.
   */
  async verifyUser(c: Context) {
    try {
      const data = await c.req.json();
      const { email, password } = await loginValidation.parse(data);
      // check user existing
      const userCheck = await UserModel.findByEmail(email);
      if (!userCheck) {
        return c.json({ message: "User not found", data: null }, 404);
      }
      // process login
      const user = await UserModel.verifyUser(email, password);
      let token = null;
      let refreshToken = null;
      if (!user) {
        return c.json(
          { message: "Invalid email or password", data: null },
          400
        );
      }
      token = await generateAccessToken(user);
      refreshToken = await generateRefreshToken(user);
      return c.json(
        {
          message: "User logged in successfully",
          data: { ...user, token, refreshToken },
        },
        200
      );
    } catch (error) {
      Log.error("Error ./controllers/UserController.getUser " + error);
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

  async refreshToken(c: Context) {
    const authHeader = c.req.header("Authorization");
    const tokenRefresh = authHeader?.split(" ")[1];
    // check if token is present
    if (!tokenRefresh) {
      return c.json({ message: "Unauthorized", data: null }, 401);
    }
    try {
      const payload = await verifyRefreshToken(tokenRefresh);
      const user = await UserModel.findById(Number(payload.id));
      if (!user) {
        return c.json({ message: "Unauthorized", data: null }, 401);
      }
      const token = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      return c.json({
        message: "Token refreshed successfully",
        data: { ...user, token, refreshToken },
      });
    } catch {
      return c.json({ message: "Unauthorized", data: null }, 401);
    }
  }

  /**
   * Deletes a user record by its ID from the database.
   *
   * @param c - The request context containing the HTTP request and response objects.
   *
   * @returns A JSON response indicating the result of the delete operation.
   *          On success, returns a 200 status with the deleted user data.
   *          On validation or internal errors, returns a 400 or 500 status with an error message.
   *
   * @throws Returns a JSON response with an error message if validation fails or
   *         an unexpected error occurs during user deletion.
   */
  async deleteUser(c: Context) {
    try {
      const id = c.req.param("id");
      // check user existing
      const userCheck = await UserModel.findById(Number(id));
      if (!userCheck) {
        return c.json({ message: "User not found", data: null }, 404);
      }
      // process delete
      const userDeleted = await UserModel.delete(Number(id));
      return c.json(
        {
          message: "User deleted successfully",
          data: userDeleted,
        },
        200
      );
    } catch (error) {
      Log.error("Error ./controllers/UserController.deleteUser " + error);
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

export default new UserController();
