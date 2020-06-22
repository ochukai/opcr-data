const path = require('path');
const fs = require('fs');
const { writeFile } = require('./write');

const sqlite3 = require('sqlite3').verbose();
const dbName = 'redive_cn.db';
// const dbName = 'oli-tw.db';
const dbPath = path.join(__dirname, 'db', dbName);
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

const maps = [
  { sql: 'equipment.sql', json: 'equipment.json' },
  { sql: 'equipment-craft.sql', json: 'equipment-craft.json' },
  { sql: 'item.sql', json: 'item.json' },
  { sql: 'quest.sql', json: 'quest.json' },
  { sql: 'select-rank-equip.sql', json: 'rank.json' },
  { sql: 'unit.sql', json: 'unit.json' },
];

db.serialize(async e => {
  console.log(' - serialize db', e || '');
  
  for (let i = 0; i < maps.length; i ++) {
    const tar = maps[i];
    console.log(JSON.stringify(tar));
    
    const dummy = sql(tar.sql);
    const result = await all(dummy);
    writeFile(tar.json, result);
  }
});
