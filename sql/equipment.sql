select
  ed.equipment_id id,
  ed.equipment_name name,
  ed.promotion_level level,
  ed.craft_flg
from equipment_data ed
where 
  ed.promotion_level != 99
order by 
  ed.equipment_id
  -- ed.promotion_level = 1 
  -- or ed.promotion_level = 2 
  -- or ed.craft_flg = 1