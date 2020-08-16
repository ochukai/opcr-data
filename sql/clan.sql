select
  unit_id id,
  unit_name name,
  atk_type
from unit_enemy_data ued
where
  ued.unit_id > 300000
  and ued.unit_id < 400000
  and ued.unit_id % 100 = 0;
