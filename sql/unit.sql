select
  ud.unit_id id,
  ud.unit_name name,
  ud.rarity star,
  ud.atk_type,
  up.age age,
  up.guild_id gid,
  up.guild guild,
  -- up.search_area_width saw
  up.race
  -- up.height,
  -- up.weight,
  -- up.blood_type blood,
  -- up.voice
from unit_data ud
join unit_profile up on up.unit_id = ud.unit_id
where
  -- ud.unit_id = 101701
  -- and
  ud.move_speed > 0 -- 是人都会动的
