select
  itd.item_id id,
  itd.item_name name,
  itd.item_type type
from item_data itd
where 
  itd.item_type != 13
  and itd.item_type != 6
  and itd.item_type != 12
  and itd.item_type != 16
  and itd.item_type != 7
  and itd.item_type != 99
