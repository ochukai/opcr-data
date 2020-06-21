select
  ud.unit_id,
  ud.unit_name,
  ud.atk_type,
  up.promotion_level,
  up.equip_slot_1,
  ed1.equipment_name name1,
  up.equip_slot_2,
  ed2.equipment_name name2,
  up.equip_slot_3,
  ed3.equipment_name name3,
  up.equip_slot_4,
  ed4.equipment_name name4,
  up.equip_slot_5,
  ed5.equipment_name name5,
  up.equip_slot_6,
  ed6.equipment_name name6
from
  unit_data ud
join unit_promotion up
  on up.unit_id = ud.unit_id
left join equipment_data ed1
  on ed1.equipment_id = up.equip_slot_1
join equipment_data ed2
  on ed2.equipment_id = up.equip_slot_2
join equipment_data ed3
  on ed3.equipment_id = up.equip_slot_3
join equipment_data ed4
  on ed4.equipment_id = up.equip_slot_4
join equipment_data ed5
  on ed5.equipment_id = up.equip_slot_5
join equipment_data ed6
  on ed6.equipment_id = up.equip_slot_6
where
  up.unit_id = 101001
