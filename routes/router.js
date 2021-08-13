const express = require("express");
const router = express.Router();

/**
 * HTTP Status Codes: https://developer.mozilla.org/de/docs/Web/HTTP/Status
 */

// log requests
router.use("*", (req, res, next) => {
  console.log(`\x1b[33m${req.method}\x1b[35m ${req.baseUrl}\x1b[0m`);
  next();
});

// add single router files
const routeFiles = ["todos"];
routeFiles.forEach((route) => {
  let routeFile = require(`./${route}.js`);
  try {
    router.use(`/${route}`, routeFile);
  } catch (err) {
    console.log(`\x1b[31m[ERR] Router file ${routeFile} does not exist.\x1b[0m`);
  }
});

module.exports = router;
