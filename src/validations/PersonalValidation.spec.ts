import { describe, it, expect } from "bun:test";
import { validatePersonal } from "./PersonalValidation";

describe("PersonalValidation Tests", () => {
  it("should validate a personal with correct data", () => {
    const validPersonal = {
      name: "Test Personal",
    };

    const validationResult = validatePersonal.safeParse(validPersonal);
    expect(validationResult.success).toBe(true);
  });

  it("should fail validation for personal with empty name", () => {
    const invalidPersonal = {
      name: "",
    };

    const validationResult = validatePersonal.safeParse(invalidPersonal);
    expect(validationResult.success).toBe(false);
  });
});
