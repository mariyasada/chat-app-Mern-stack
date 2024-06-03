class apiErrorHandler extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); //When creating custom error classes, you can use Error.captureStackTrace to ensure the stack trace points to the location where the custom error was instantiated, rather than where it was thrown or logged.
    }
  }
}

export { apiErrorHandler };
