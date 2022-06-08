const { Success, Fail } = require("./Response");
const { GetRoute } = require("./Routes");

exports.handler = async (event) => {
  //console.log("Handling request", event);
  let response = Fail("Failed to process request");
  try {
    const requestBody = getRequestBody(event);
    console.log("Got Request Body", requestBody);
    response = await handleRequest(requestBody, event);
  } catch (error) {
    console.error("Exception", error);
    response = Fail(error);
  }

  console.log("Built Response", response);
  return response;
};

const getRequestBody = (request) => {
  console.log("Getting request Body", request.body);
  const body = JSON.parse(request.body);
  return body;
};

const handleRequest = async (requestBody, fullRequest) => {
  const route = getRoute(requestBody);
  const action = getAction(route, requestBody);

  const result = await action(requestBody, fullRequest);
  return Success(result);
};

const getRoute = (requestBody) => {
  let routeName = requestBody.route;
  if (!routeName) {
    throw "No route was specified for the request";
  }

  const route = GetRoute(routeName);
  if (!route) {
    throw `Could not find route with name: ${routeName}. (route names are case-insensitive)`;
  }
  return route;
};

const getAction = (route, requestBody) => {
  let actionName = requestBody.action;
  if (!actionName) {
    throw "No action was specified for the request";
  }

  const action = route[actionName];
  if (!action) {
    console.error(
      `Could not find action with name: ${actionName} on route:`,
      route
    );
    throw `Could not find action with name: ${actionName} on route. (action names are case-sensitive)`;
  }
  return action;
};
