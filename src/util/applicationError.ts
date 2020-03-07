class Error extends Error {
  constructor(args) {
    super(args);
    this.name = "ApplicationError"
  }
}