import { describe, it, expect } from "bun:test";
import { validateAddress } from "./AddressValidation";

describe("AddressValidation Tests", () => {
  it("should validate address with correct data", () => {
    const validAddress = {
      addressName: "Home",
      address: "123 Main St",
      city: "Test City",
      province: "Test Province",
      country: "Test Country",
    };

    const validationResult = validateAddress.safeParse(validAddress);
    expect(validationResult.success).toBe(true);
  });

  it("should fail validation for address without addressName", () => {
    const invalidAddress = {
      address: "123 Main St",
      city: "Test City",
      province: "Test Province",
      country: "Test Country",
    };

    const validationResult = validateAddress.safeParse(invalidAddress);
    expect(validationResult.success).toBe(false);
  });

  it("should fail validation for address without address", () => {
    const invalidAddress = {
      addressName: "Home",
      city: "Test City",
      province: "Test Province",
      country: "Test Country",
    };

    const validationResult = validateAddress.safeParse(invalidAddress);
    expect(validationResult.success).toBe(false);
  });

  it("should validate address with optional fields missing", () => {
    const validAddress = {
      addressName: "Home",
      address: "123 Main St",
    };

    const validationResult = validateAddress.safeParse(validAddress);
    expect(validationResult.success).toBe(true);
  });
});
