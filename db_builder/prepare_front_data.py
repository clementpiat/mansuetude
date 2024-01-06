import json
from Levenshtein import hamming


MAX_CHARS = 360

with open("db_builder/data/sentences.json") as f:
    sentences = json.load(f)

with open("db_builder/data/definitions.json") as f:
    definitions = json.load(f)

not_found = 0
prepared_sentences = []
for sentence in sentences:
    if sentence.get("gpt-version") != "gpt-4":
        continue

    if sentence["message"][0] == '"' and sentence["message"][-1] == '"':
        sentence["message"] = sentence["message"][1:-1]

    if len(sentence["message"]) > MAX_CHARS:
        not_found += 1
        continue

    found_words = []
    for word in sentence["words"]:
        if word not in definitions or not definitions[word]["def"]:
            break

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
            if min_distance <= 2:
                found_words.append({
                    "match": x,
                    "word": word,
                    "definition": {
                        "def": definitions[word]["def"],
                        "synonyms": definitions[word]["syn"]
                    },
                })
                found = True

    if len(found_words) != len(sentence["words"]):
        not_found += 1
        continue

    sentence["words"] = found_words
    prepared_sentences.append(sentence)

print(f"Not found: {not_found} / {len(sentences)}")

with open("public/definitions.json", "w") as f:
    words =  set()
    definitions = {}
    for x in prepared_sentences:
        for word in x["words"]:
            if word["word"] in words:
                continue

            words.add(word["word"])
            definitions[word["word"]] = word

    json.dump(definitions, f, indent=2)

with open("public/data.json", "w") as f:
    json.dump(prepared_sentences, f, indent=2)
