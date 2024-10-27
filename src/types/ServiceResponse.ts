type ServiceResponseErrorType =
  | 'INVALID_DATA'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'UNPROCESSABLE_ENTITY'
  | 'INTERNAL_SERVER_ERROR';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: { message: string };
};

export type ServiceResponseSuccessful<T> = {
  status: 'SUCCESSFUL' | 'CREATED' | 'NO_CONTENT';
  data: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccessful<T>;
