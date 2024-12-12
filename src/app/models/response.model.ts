export type Response<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T
  }