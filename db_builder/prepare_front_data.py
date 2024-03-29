import json
from copy import deepcopy


MAX_CHARS = 360


with open("db_builder/data/mistral_sentences.json") as f:
    SENTENCES = json.load(f)

with open("db_builder/data/cntrl_definitions.json") as f:
    DEFINITIONS = json.load(f)


def parse_example(example):
    text = example["text"]

    # handle the end
    elements = text.split("(...)")
    start_text = "(...)".join(elements[:-1])
    end_text = elements[-1]

    elements = end_text.split("(")
    if len(elements) != 2:
        return

    end_text = elements[0].strip()
    if end_text[-1] not in [".", "!", "?", ";"]:
        if elements[1][-1] in [".", "!", "?", ";"]:
            end_text += elements[1][-1]
        else:
            end_text += "..."

    text = start_text + "(...)" + end_text

    # handle the start
    if text[:3] == "...":
        example["text"] = text
        return example
 
    while text[0] == "." or text[0].isdigit():
        text = text[1:].strip()

    if text[:5] == "(...)":
        text = text[5:]

    example["text"] = text
    return example


def parse_definitions(definitions):
    parsed_definitions = []
    for _definition in definitions:
        definition = deepcopy(_definition)
        definition["examples"] = [parse_example(x) for x in definition["examples"]]
        definition["examples"] = [x for x in definition["examples"] if x]
        for key in ["text", "synonymes", "syntagme"]:
            if definition[key]:
                definition[key] = definition[key].strip(":").strip().strip(",")
                if key == "synonymes":
                    # get rid of anton
                    definition[key] = definition[key].split(";")[0]
                    # get rid of number
                    if definition[key][-1].isdigit():
                        definition[key] = definition[key][:-1]
                    if definition[key][-2].isdigit() and definition[key][-1] == ".":
                        definition[key] = definition[key][:-2]

        parsed_definitions.append(definition)

    return parsed_definitions


prepared_sentences = []
for sentence in SENTENCES:
    sentence["message"].strip('"')

    if len(sentence["message"]) > MAX_CHARS:
        continue

    if not sentence["message"]:
        continue

    if sentence["message"][-1] != ".":
        continue

    found_words = []
    for word in sentence["words"]:
        for x in sentence["message"].split(" "):
            x = x.replace(",", "").replace(".", "").replace(":", "")
            if word == x.lower() or (len(word) > 3 and word in x.lower()):
                found_words.append({
                    "match": x,
                    "word": word,
                    "definitions": parse_definitions(DEFINITIONS[word])
                })
                break

    if len(found_words) != len(sentence["words"]):
        continue

    sentence["words"] = found_words
    sentence["message"] = sentence["message"]
    prepared_sentences.append(sentence)

print(f"Found: {len(prepared_sentences)} / {len(SENTENCES)}")


definitions = {}
for x in prepared_sentences:
    for word in x["words"]:
        definitions[word["word"]] = word

PLACEHOLDER_WORD = "mansuétude"
definitions[PLACEHOLDER_WORD] = {
    "word": PLACEHOLDER_WORD,
    "definitions": parse_definitions(DEFINITIONS[PLACEHOLDER_WORD])
}

with open("public/definitions.json", "w") as f:
    json.dump(definitions, f, indent=2)

with open("public/data.json", "w") as f:
    json.dump(prepared_sentences, f, indent=2)

with open("db_builder/data/youtube_links.json") as f:
    youtube_links = json.load(f)

with open("public/youtube_links.json", "w") as f:
    json.dump(youtube_links, f, indent=2)
