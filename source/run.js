const fs = require("fs");
const path = require('path');
const readLine = require("readline");

const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'db', 'oli-tw.db');
const db = new sqlite3.Database(dbPath);

function readFileToArr(fileName) {
  return new Promise((resolve, reject) => {
    const arr = [];
    const readObj = readLine.createInterface({
      input: fs.createReadStream(fileName)
    });

    readObj.on('line', function (line) {
      arr.push(line);
    });

    readObj.on('close', function () {
      resolve(arr);
    });
  });
}

function sleep(count = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000 * count);
  });
}

const files = [
  // 'equipment_data.sql',
  // 'equipment_craft.sql',
  // 'item_data.sql',
  'quest_data.sql',
  // 'quest_reward_data.sql',
  // 'unit_data.sql',
  // 'unit_profile.sql',
  // 'unit_promotion.sql'
];

const fileDirs = files.map(file => path.join(__dirname, file));

async function readSqls() {
  const filePromises = fileDirs.map(fileName => readFileToArr(fileName));
  const results = await Promise.all(filePromises);

  for (let i = 0; i < results.length; i++) {
    const table = results[i];
    for (let j = 0; j < table.length; j++) {
      const line = table[j];

      console.log((i + 1), results.length, (j + 1), table.length);
      await run(line);
    }
  }
}

function run(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, err => err ? reject(err) : resolve());
  });
}

db.serialize((e) => {
  readSqls();
});




