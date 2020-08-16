SELECT
  ed.equipment_id id,
  ed.equipment_name name,
  -- ed.craft_flg, -- 1 成品装备 0 碎片
  -- ed.promotion_level level, -- 装备等级
  ec.condition_equipment_id_1 id1,
  ed1.equipment_name name1,
  ec.consume_num_1 num1,
  ec.condition_equipment_id_2 id2,
  ed2.equipment_name name2,
  ec.consume_num_2 num2,
  ec.condition_equipment_id_3 id3,
  ed3.equipment_name name3,
  ec.consume_num_3 num3,
  ec.condition_equipment_id_4 id4,
  ed4.equipment_name name4,
  ec.consume_num_4 num4, -- 现在最多只需要四个合成的
  ec.condition_equipment_id_5 id5,
  ec.condition_equipment_id_6 id6
from equipment_craft ec
  join equipment_data ed on ed.equipment_id = ec.equipment_id
  left join equipment_data ed1 on ed1.equipment_id = ec.condition_equipment_id_1
  left join equipment_data ed2 on ed2.equipment_id = ec.condition_equipment_id_2
  left join equipment_data ed3 on ed3.equipment_id = ec.condition_equipment_id_3
  left join equipment_data ed4 on ed4.equipment_id = ec.condition_equipment_id_4
order by ec.consume_num_1 desc
-- where ec.consume_num_1 = 20

