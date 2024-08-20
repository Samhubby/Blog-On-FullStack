export class ApiError {
  status;
  message;
  data;
  success;
  constructor(status, message, data) {
    this.status = status || 500;
    this.message = message || "Internal Server Error";
    this.data = data || null;
    this.success = status < 400;
  }
}
