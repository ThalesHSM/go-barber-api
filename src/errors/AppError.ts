class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
// https://www.facebook.com/mashupmemeboy/videos/167018138147845
// https://www.facebook.com/GGTTW5/videos/129839875631225
