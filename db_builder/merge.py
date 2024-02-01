import os
import json


for file_kind in ["definitions", "youtube_links"]:
    d = {}
    path = "db_builder/data/" + file_kind
    for filename in os.listdir(path):
        with open(path + "/" + filename) as f:
            d.update(json.load(f))

    with open(f"db_builder/data/{file_kind}.json", "w") as f:
        json.dump(d, f, indent=2)
