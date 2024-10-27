const mapHTTPStatus = (status: string): number => {
  const statusHTTP: Record<string, number> = {
    NOT_FOUND: 404,
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    UNPROCESSABLE_ENTITY: 422,
    SUCCESSFUL: 200,
    CREATED: 201,
  };

  return statusHTTP[status] ?? 500;
};

export default mapHTTPStatus;