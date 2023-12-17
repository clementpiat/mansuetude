from collections import defaultdict, Counter
import json

definitions_by_kind = defaultdict(lambda: [])
MIN_ELEMENTS_IN_KIND = 200
MAX_RATIO = 1
MIN_RATIO = 0
CATEGORY = "littéraire"

with open("db_builder/data/definitions.json") as f:
    definitions = json.load(f)

with open("db_builder/data/ngrams.txt") as f:
    scores = dict([x.split(": ") for x in f])


def is_litteraire(definiton):
    return definition["indic"] == CATEGORY and definition["text"][:10].lower() == "littéraire"


for word, definition in definitions.items():
    if word not in scores:
        continue

    if not is_litteraire(definition):
        continue

    definitions_by_kind[definition["kind"]].append(
        {
            "word": word,
            "score": scores[word],
            "definition": definition
        }
    )


for key, _definitions in definitions_by_kind.items():
    definitions_by_kind[key] = sorted(_definitions, key=lambda x: x["score"])

category_words = set()
for definition in definitions.values():
    if not is_litteraire(definition):
        continue

    category_words = category_words | set(x.lower() for x in definition["words"])

selected_words = []
for key, _definitions in definitions_by_kind.items():
    _count = len(_definitions)
    if _count > MIN_ELEMENTS_IN_KIND:
        with open(f"db_builder/data/words_by_kind/{key}.txt", "w") as f:
            l = [": ".join((x["word"], str(float(i) / _count))) for i, x in enumerate(_definitions)]
            f.write("\n".join(l))

    for i, x in enumerate(_definitions):
        if i > (MAX_RATIO * _count) or i < (MIN_RATIO * _count):
            continue

        if x["definition"]["def"]: 
            if any(word.lower().replace(".", "").replace(",", "") in category_words for word in x["definition"]["def"].split(" ")):
                continue

            selected_words.append(x["word"])


with open(f"db_builder/data/selected_words_by_indic/{CATEGORY}.txt", "w") as f:
    f.write("\n".join(selected_words))
