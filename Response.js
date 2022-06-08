exports.Success = (data) => {
  return {
    success: true,
    response: data,
  };
};
exports.Fail = (message, data) => {
  return {
    success: false,
    errorMessage: message,
    response: data,
  };
};
