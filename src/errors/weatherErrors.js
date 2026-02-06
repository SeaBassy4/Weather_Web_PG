export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.type = "VALIDATION_ERROR";
  }
}

export class WeatherAPIError extends Error {
  constructor(message, type = "API_ERROR", details = {}) {
    super(message);
    this.name = "WeatherAPIError";
    this.type = type;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export class NetworkError extends WeatherAPIError {
  constructor(message = "Network error") {
    super(message, "NETWORK_ERROR");
  }
}

export class TimeoutError extends WeatherAPIError {
  constructor(message = "Request timed out") {
    super(message, "TIMEOUT_ERROR");
  }
}

export class CityNotFoundError extends WeatherAPIError {
  constructor(city) {
    super(`City "${city}" not found`, "CITY_NOT_FOUND", { city });
  }
}

export class RateLimitError extends WeatherAPIError {
  constructor(message = "Rate limit exceeded") {
    super(message, "RATE_LIMIT_ERROR");
  }
}
