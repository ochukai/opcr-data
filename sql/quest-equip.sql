select
  qd.quest_id id,
  qd.quest_name name,
  qrd.reward_id_1 id1,
  -- qrd.reward_type_1,
  ed1.equipment_name name1,
  -- qrd.reward_num_1 num1,
  qrd.reward_id_2 id2,
  -- qrd.reward_type_2,
  ed2.equipment_name name2,
  qrd.reward_id_3 id3,
  itd.item_name name3,
  qrd.reward_id_4 id4,
  qrd.reward_id_5 id5
from
  quest_data qd
join quest_reward_data qrd
  on qrd.reward_group_id = qd.clear_reward_group
left join equipment_data ed1
  on ed1.equipment_id = qrd.reward_id_1
left join equipment_data ed2
  on ed2.equipment_id = qrd.reward_id_2
left join item_data itd
  on itd.item_id = qrd.reward_id_3
where
  qd.daily_limit = 0
  or qd.daily_limit = 3
  -- 还有一个升级调查 是 5

