from tqdm import tqdm
import random
import json
import requests
import os


N_SENTENCES = 10
N_WORDS = 3
MISTRAL_VERSION = "mistral-medium"


def main():
    with open("db_builder/data/cntrl_definitions.json") as f:
        DEFINITIONS = json.load(f)

    WORDS = [x for x in DEFINITIONS]

    with open("db_builder/data/mistral_sentences.json") as f:
        result = json.load(f)

    for _ in tqdm(range(N_SENTENCES)):
        sub_words = random.choices(WORDS, k=N_WORDS)
        payload = {
            "model": "mistral-medium",
            "messages": [
                {
                    "role": "user",
                    "content": f"Compose une phrase vraie avec les mots suivants : {', '.join(sub_words)}."
                }
            ],
            "temperature": 0.7,
            "top_p": 1,
            "max_tokens": 128,
        }

        r = requests.post(
            "https://api.mistral.ai/v1/chat/completions",
            json=payload,
            headers={"Authorization": f"Bearer {os.getenv('MISTRAL_API_KEY')}"}
        )

        message = r.json()["choices"][0]["message"]["content"]

        result.append({
            "message": message,
            "words": sub_words,
        })

    with open("db_builder/data/mistral_sentences.json", "w") as f:
        json.dump(result, f, indent=2)


if __name__ == "__main__":
    main()
