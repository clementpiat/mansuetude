import json


with open("db_builder/data/sentences_mistral.json") as f:
    results = json.load(f)

new_results = []
for result in results:
    result["parsedMessage"] = result["message"].split("[/INST]")[-1].strip('"').strip().strip('</s>')
    result["parsedMessage"] = result["parsedMessage"][0].upper() + result["parsedMessage"][1:]
    result["parsedMessage"].split("\n\n")[0]

    new_results.append(result)

with open("db_builder/data/sentences_mistral_parsed.json", "w") as f:
    json.dump(new_results, f, indent=2)