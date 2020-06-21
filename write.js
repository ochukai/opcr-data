
const stringify = require("json-stringify-pretty-compact");
const fs = require('fs-extra');
const path = require('path');

exports.writeFile = function (dir = __dirname, fileName, value, render) {
  let jsonValue = stringify(value, {
    maxLength: 120
  });

  if (render) {
    jsonValue = render(jsonValue);
  }

  fs.writeFileSync(path.join(dir, fileName), jsonValue);
}
