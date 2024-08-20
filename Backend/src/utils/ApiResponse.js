export class ApiResponse {
  status;
  message;
  data;
  success;
  constructor(status, message, data, success) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = success || true;
  }
}
