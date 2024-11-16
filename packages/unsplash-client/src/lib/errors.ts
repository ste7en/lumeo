export class UnsplashClientError extends Error {
  constructor(public override message: string, public status?: number, public errors?: string[]) {
    super();
    this.status = status;
    this.errors = errors;
  }
}
