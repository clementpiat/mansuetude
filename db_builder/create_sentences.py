# TODO: use open ai API, should cost about 0.2e
from openai import OpenAI
import os
from tqdm import tqdm
import random
import json


client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

N_SENTENCES = 1
N_WORDS = 3
GPT_VERSION = "gpt-4"
FIRST_X_PERCENT_ONLY = 0.5  # Between 0 and 1


def main():
    with open("db_builder/data/definitions.json") as f:
        DEFINITIONS = json.load(f)


    with open("db_builder/data/webnext.txt") as f:
        _words = [x for x in f.read().split("\n") if x in DEFINITIONS and DEFINITIONS[x].get("text", DEFINITIONS[x]["def"])]
        WORDS = _words[:int(len(_words) * FIRST_X_PERCENT_ONLY)]


    with open("db_builder/data/sentences.json") as f:
        result = json.load(f)

    for _ in tqdm(range(N_SENTENCES)):
        sub_words = random.choices(WORDS, k=N_WORDS)
        _definitions = ["\n".join(DEFINITIONS[x].get("text", DEFINITIONS[x]["def"]).strip().split("\n\n")) for x in sub_words]
        definitions = "".join((f"\n\n- {x}: {y}" for x, y in zip(sub_words, _definitions)))
        question = f'''Compose une phrase vraie avec les mots suivants : {', '.join(sub_words)}.
    Pour rappel, voici la définition des mots à inclure:{definitions}
        '''
        print(question)
        return
        response = client.chat.completions.create(
            model=GPT_VERSION,
            messages=[
                {
                    "role": "system",
                    "content": "Tu es un assistant intelligent francophone."
                },
                {
                    "role": "user",
                    "content": question
                },
            ]
        )
        message = response.choices[0].message.content
        result.append({
            "message": message,
            "words": sub_words,
            "gpt-version": GPT_VERSION,
        })

    with open("db_builder/data/sentences.json", "w") as f:
        json.dump(result, f, indent=2)


if __name__ == "__main__":
    main()
