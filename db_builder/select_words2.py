import json

with open("db_builder/data/definitions.json") as f:
    definitions = json.load(f)

with open("db_builder/data/previous_definitions.json") as f:
    definitions = json.load(f)


selected_words = [word for word in definitions]

with open(f"db_builder/data/selected_words.txt", "w") as f:
    f.write("\n".join(selected_words))
