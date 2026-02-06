import { ValidationError } from "../errors/weatherErrors";

export function sanitizeCityName(city) {
  return city.toString().trim().replace(/[<>]/g, "").substring(0, 100);
}

export function validateCity(city) {
  if (!city || typeof city !== "string") {
    throw new ValidationError("City name must be a non-empty string");
  }

  const sanitized = sanitizeCityName(city);

  if (sanitized.length < 2) {
    throw new ValidationError("City name must be at least 2 characters");
  }

  if (sanitized.length > 100) {
    throw new ValidationError("City name too long");
  }

  return sanitized;
}

export function validateTimeout(timeoutMs) {
  if (typeof timeoutMs !== "number" || timeoutMs < 1000 || timeoutMs > 30000) {
    throw new ValidationError("Timeout must be between 1000 and 30000 ms");
  }
}
