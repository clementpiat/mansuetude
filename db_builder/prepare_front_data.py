import json
from Levenshtein import hamming


with open("db_builder/data/sentences.json") as f:
    sentences = json.load(f)

with open("db_builder/data/definitions.json") as f:
    definitions = json.load(f)

not_found = 0
prepared_sentences = []
for sentence in sentences:
    found_words = []
    for word in sentence["words"]:
        distances = []
        found = False
        for x in sentence["message"].split(" "):
            x = x.replace(",", "").replace(".", "")
            if word == x.lower() or (len(word) > 3 and word in x.lower()):
                found_words.append({
                    "match": x,
                    "word": word,
                    "definition": {
                        "def": definitions[word]["def"],
                        "synonyms": definitions[word]["syn"]
                    },
                })
                found = True
                break

            distances.append((hamming(word, x), x))

        if not found:
            min_distance, x = min(distances)
            if min_distance <= 3:
                found_words.append({
                    "match": x,
                    "word": word,
                    "definition": {
                        "def": definitions[word]["def"],
                        "synonyms": definitions[word]["syn"]
                    },
                })
                found = True
        
        if not found:
            print(word)

    if len(found_words) != len(sentence["words"]):
        not_found += 1
        continue

    sentence["words"] = found_words
    prepared_sentences.append(sentence)

print(f"Not found: {not_found} / {len(sentences)}")

with open("public/data.json", "w") as f:
    json.dump(prepared_sentences, f, indent=2)
