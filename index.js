const path = require('path');
const fs = require('fs');
const { writeFile } = require('./write');

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'db', 'oli-tw.db');
const db = new sqlite3.Database(dbPath);

function sql(file) {
  const sqlPath = path.join(__dirname, 'sql', file);
  return fs.readFileSync(sqlPath).toString();
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.log('sql error', err);
        reject(err);
        return;
      }
  
      resolve(rows);
    });
  });
}

db.serialize(async e => {
  console.log(' - serialize db', e || '');
  
  const dummy = sql('unit.sql');
  const result = await all(dummy);
  writeFile('unit.json', result);
});
