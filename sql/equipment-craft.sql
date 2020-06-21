SELECT
  ed.equipment_id,
  ed.equipment_name,
  ed.craft_flg, -- 1 成品装备 0 碎片
  ed.promotion_level, -- 装备等级
  ec.condition_equipment_id_1,
  ed1.equipment_name name1,
  ec.consume_num_1,
  ec.condition_equipment_id_2,
  ed2.equipment_name name2,
  ec.consume_num_2,
  ec.condition_equipment_id_3,
  ed3.equipment_name name3,
  ec.consume_num_3,
  ec.condition_equipment_id_4,
  ed4.equipment_name name4,
  ec.consume_num_4 -- 现在最多只需要四个合成的
from equipment_craft ec
  join equipment_data ed on ed.equipment_id = ec.equipment_id
  left join equipment_data ed1 on ed1.equipment_id = ec.condition_equipment_id_1
  left join equipment_data ed2 on ed2.equipment_id = ec.condition_equipment_id_2
  left join equipment_data ed3 on ed3.equipment_id = ec.condition_equipment_id_3
  left join equipment_data ed4 on ed4.equipment_id = ec.condition_equipment_id_4
order by ec.consume_num_1 desc
-- where ec.consume_num_1 = 20

