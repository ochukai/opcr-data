const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'db', 'redive_cn.db');

const db = new sqlite3.Database(dbPath);

const questEquipSql = `select
qd.quest_id,
qd.quest_name,
qrd.reward_id_1,
qrd.reward_type_1,
ed1.equipment_name name1,
qrd.reward_num_1,
qrd.reward_id_2,
qrd.reward_type_2,
ed2.equipment_name name2,
qrd.reward_id_3,
itd.item_name name3,
qrd.reward_id_4,
qrd.reward_id_5
from
quest_data qd
join quest_reward_data qrd
on qrd.reward_group_id = qd.clear_reward_group
left join equipment_data ed1
on ed1.equipment_id = qrd.reward_id_1
left join equipment_data ed2
on ed2.equipment_id = qrd.reward_id_2
left join item_data itd
on itd.item_id = qrd.reward_id_3`;

db.serialize((e) => {
  console.log(' - read serialize db', e || '');

  db.all(questEquipSql, [], (err, rows) => {
    if (err) {
      console.log('all error', err);
      return;
    }

    console.log('db all result', rows.length);
  });
});
