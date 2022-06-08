const { Success, Fail } = require("./Response");

exports.handler = async (event) => {
  console.log("Handling request", event);
  let body = { msg: "error" };
  try {
    body = await getResponseBody(event);
  } catch (error) {
    console.error("Exception", error);
    body = Fail(error, {});
  }
  console.log("Got Body", body);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "https://cwynn.com",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: body,
  };
  console.log("Build Response", response);
  return response;
};

const getResponseBody = async (event) => {
  const operation = event.operation.toLowerCase();
  console.log("Handling Operation", operation);
  switch (operation) {
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
