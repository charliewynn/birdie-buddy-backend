const Authentication = require("./Authentication");

exports.GetRoute = (routeName) => {
  console.log("Looking up route: " + routeName);
  switch (routeName.toLowerCase()) {
    case "authentication":
      return Authentication;
  }
};
