const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const { writeFile } = require('./write');

const sqlite3 = require('sqlite3').verbose();
// const dbName = 'oli-tw.db';
// const dbName = 'redive_tw.db';
const dbName = 'redive_cn.db';
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
  { sql: 'clan.sql', json: 'clan.json' },
];

db.serialize(async e => {
  console.log(' - serialize db', e || '');

  for (let i = 0; i < maps.length; i++) {
    const tar = maps[i];
    console.log(JSON.stringify(tar));

    const dummy = sql(tar.sql);
    let result = await all(dummy);

    // 12 023 003
    if (tar.sql === 'quest.sql') {
      result.forEach(q => {
        const id = String(q.id);
        q.type = parseInt(id.slice(0, 2));
        q.areaId = parseInt(id.slice(2, 5)); // 11 12

        const nameNo = q.name.split(' ');
        q.areaName = nameNo[0];
        q.areaNo = nameNo[1];
        q.areaTitle = q.areaId + ' - ' + q.areaName;
      });

      result = _.groupBy(result, 'areaTitle');
    }

    writeFile(tar.json, result);
  }
});
