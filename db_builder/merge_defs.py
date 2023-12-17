import json

big_dict = {}
for i in range(1):
    with open(f"db_builder/data/definitions/_definitions_{i}.json") as f:
        big_dict.update(json.load(f))
    
with open("db_builder/data/definitions.json", "w") as f:
    json.dump(big_dict, f, indent=2)