export type IGenericErrorMessages = {
  path: string
  message: string
}
export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessages[]
}
