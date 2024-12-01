export interface Response<T> {
  message: string,
  data: T,
  statusCode: number
}