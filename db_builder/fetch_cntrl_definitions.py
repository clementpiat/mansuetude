from tqdm import tqdm
import requests
import json
from time import sleep
from bs4 import BeautifulSoup
import re


BASE_URL = "https://www.cnrtl.fr/definition/"
SLEEP_EVERY_N_ITERS = 30
LOAD = False


def parse_exemple(x):
    author = x.find(class_="tlf_cauteur")
    title = x.find(class_="tlf_ctitre")
    date = x.find(class_="tlf_cdate")

    return {
        "text": x.text,
        "author": author.text if author else None,
        "title": title.text if title else None,
        "date": date.text if date else None,
    }


def get_definitions(soup):
    definition = soup.findChild(class_="tlf_cdefinition", recursive=False)
    if definition:
        synonymes = soup.findChild(class_="tlf_csynonime", recursive=False)
        syntagme = soup.findChild(class_="tlf_csyntagme", recursive=False)

        return [
            {
                "text": definition.text,
                "examples": [
                    parse_exemple(x) for x in soup.find_all(class_="tlf_cexemple")
                ],
                "syntagme": syntagme.text if syntagme else None,
                "synonymes": synonymes.text if synonymes else None,
            }
        ]

    definitions = []
    for paragraph in soup.findChildren(class_="tlf_parah", recursive=False):
        definitions += get_definitions(paragraph)

    return definitions


def main():
    words = []
    for filename in [
        "my_own_words", "quizlet_voltaire", "culture_generale",
        "dictionnaire_didier_meral", "francoisnore", "jolismots",
        "webnext_1500"
    ]:
        with open(f"db_builder/data/words_lists/{filename}.txt") as f:
            words += [
                x.lower() for x in f.read().split("\n") if " " not in x
            ]

    words = set(words)
    print(f"{len(words)} words")

    if LOAD:
        with open("db_builder/data/cntrl_definitions.json") as f:
            definitions_map = json.load(f)
    else:
        definitions_map = {}

    for i, word in tqdm(enumerate(words)):
        if i % SLEEP_EVERY_N_ITERS == (SLEEP_EVERY_N_ITERS - 1):
            sleep(1)

        url = BASE_URL + word
        response = requests.get(url)
        if not response.ok:
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        soup = soup.find(id="lexicontent")
        if not soup:
            # print(f"lexicontent not found : {word}")
            continue

        if len(soup.findChildren(recursive=False)) > 1:
            found = False
            for el in soup.find_all("div", {"id": re.compile(r'art.*')}):
                name = el.findChild("span", class_="tlf_cmot", recursive=False)
                if name and name.text.lower().startswith(word):
                    soup = el
                    found = True
                    break
            
            if not found:
                print(f"definition not found : {word}")
                continue
        else:
            soup = soup.findChild("div", {"id": re.compile(r'art.*')}, recursive=False)

        if not soup:
            print(f"no article : {word}")
            continue

        definitions = get_definitions(soup)

        if not definitions:
            print(f"no definition : {word}")
            continue

        definitions_map[word] = definitions

    print(f"Saving {len(definitions_map)} definitions")
    with open("db_builder/data/cntrl_definitions.json", "w") as f:
        json.dump(definitions_map, f, indent=2)


if __name__ == "__main__":
    main()
