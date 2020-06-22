
const stringify = require("json-stringify-pretty-compact");
const fs = require('fs-extra');
const path = require('path');

exports.writeFile = function (fileName, value, render) {
  let jsonValue = stringify(value, {
    maxLength: 999
  });

  if (render) {
    jsonValue = render(jsonValue);
  }

  const dir = path.join(__dirname, 'dist');
  fs.ensureDirSync(dir);
  fs.writeFileSync(path.join(dir, fileName), jsonValue);
}
