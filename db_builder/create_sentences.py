# TODO: use open ai API, should cost about 0.2e
from openai import OpenAI
import os
from tqdm import tqdm
import random
import json


client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

with open("db_builder/data/selected_words_by_indic/littéraire.txt") as f:
    WORDS = f.read().split("\n")

N_SENTENCES = 10
N_WORDS = 4

with open("db_builder/data/sentences.json") as f:
    result = json.load(f)

for _ in tqdm(range(N_SENTENCES)):
    sub_words = random.choices(WORDS, k=N_WORDS)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": '''
                    Tu es l'assistant personnel d'un professeur émérite de l'académie française,
                    et tu vas m'aider à composer des phrases sur la base de mots de vocabulaire spécifiés que je souhaite assimiler.
                '''
            },
            {"role": "user", "content": f"Compose une phrase contenant précisément les mots suivants : {', '.join(sub_words)}"},
        ]
    )
    message = response.choices[0].message.content
    result.append({
        "message": message,
        "words": sub_words,
    })

with open("db_builder/data/sentences.json", "w") as f:
    json.dump(result, f, indent=2)
