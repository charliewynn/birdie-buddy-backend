const { Success, Fail } = require("./Response");
const Routes = require("./Routes/index");

exports.handler = async (event) => {
  console.log("Handling request", event);
  let response = Fail("Failed to process request", event);
  try {
    const requestBody = getRequestBody(event);
    response = await handleRequest(requestBody, event);
  } catch (error) {
    console.error("Exception", error);
    response = Fail(error, event);
  }

  console.log("Built Response", response);
  return response;
};

const getRequestBody = (request) => {
  const body = JSON.parse(request.body);
  return body;
};

const handleRequest = async (requestBody, fullRequest) => {
  let routeName = requestBody.route;
  if (!routeName) {
    throw "No route was specified for the request";
  }
  routeName = routeName.toLowerCase();

  let actionName = requestBody.action;
  if (!actionName) {
    throw "No action was specified for the request";
  }
  actionName = actionName.toLowerCase();

  const route = Routes[routeName];
  if (!route) {
    throw `Could not find route with name: ${routeName}. (route names are case-insensitive)`;
  }

  const action = route[actionName];
  if (!action) {
    throw `Could not find action with name: ${actionName} on route: ${routeName}. (action names are case-insensitive)`;
  }

  const result = action(body, fullRequest);
  return Success(result);
};
