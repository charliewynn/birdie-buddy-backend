const { Success } = require("./Response");

exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "https://cwynn.com",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: await JSON.stringify(getResponseBody(event)),
  };
  return response;
};

const getResponseBody = async (event) => {
  switch (event.operation.toLowerCase()) {
    case "login":
      return Promise.resolve(Success({ msg: "you are logging in", event }));
    case "test":
      return { msg: "testing" };
    default:
      return Promise.resolve({
        requestEvent: event,
        error: "Unknown operation: " + event.operation,
      });
  }
};
