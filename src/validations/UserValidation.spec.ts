import { describe, it, expect } from "bun:test";
import {
  validateUser,
  validateNoPasswordUser,
  loginValidation,
  resetPasswordValidation,
} from "./UserValidation";

describe("UserValidation Tests", () => {
  it("should validate a user with correct data", () => {
    const validUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "StrongPassword@123",
      confirmPassword: "StrongPassword@123",
    };

    const validationResult = validateUser.safeParse(validUser);
    expect(validationResult.success).toBe(true);
  });

  it("should fail validation for user with incorrect email", () => {
    const invalidUser = {
      name: "John Doe",
      email: "invalid-email",
      password: "StrongPassword@123",
      confirmPassword: "StrongPassword@123",
    };

    const validationResult = validateUser.safeParse(invalidUser);
    expect(validationResult.success).toBe(false);
  });

  it("should validate user without password and role USER", () => {
    const userWithoutPassword = {
      name: "Jane Doe",
      email: "jane@example.com",
      role: "USER",
    };

    const validationResult =
      validateNoPasswordUser.safeParse(userWithoutPassword);
    expect(validationResult.success).toBe(true);
  });

  it("should validate login with correct credentials", () => {
    const loginData = {
      email: "john@example.com",
      password: "password123",
    };

    const validationResult = loginValidation.safeParse(loginData);
    expect(validationResult.success).toBe(true);
  });

  it("should validate reset password with matching passwords", () => {
    const resetPasswordData = {
      password: "NewPassword@123",
      confirmPassword: "NewPassword@123",
    };

    const validationResult =
      resetPasswordValidation.safeParse(resetPasswordData);
    expect(validationResult.success).toBe(true);
  });

  it("should fail reset password validation for non-matching passwords", () => {
    const resetPasswordData = {
      password: "NewPassword@123",
      confirmPassword: "DifferentPassword@123",
    };

    const validationResult =
      resetPasswordValidation.safeParse(resetPasswordData);
    expect(validationResult.success).toBe(false);
  });
});
