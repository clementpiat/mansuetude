import json
import requests
from requests_ip_rotator import ApiGateway
from tqdm import tqdm
from multiprocessing.pool import ThreadPool as Pool
from bs4 import BeautifulSoup

BASE_URL = "https://dictionnaire.lerobert.com/definition/"
BATCH_SIZE = 100
SAVE_EVERY_N_WORDS = 1000
N_THREADS = 2
ALREADY_DONE = 0

def main():
    with open("db_builder/data/webnext.txt") as f:
        words = [x for x in f.read().split("\n")]

    with open("db_builder/data/my_own_words.txt") as f:
        words += [x for x in f.read().split("\n")]
        words = set(words)
        print(f"{len(words)} total words\n")

    with ApiGateway("https://dictionnaire.lerobert.com") as g:
        session = requests.Session()
        session.mount("https://dictionnaire.lerobert.com", g)

        def parse_definition(definition):
            indic = definition.find(class_="d_mta")
            _def = definition.find(class_="d_dfn")
            synonyms = definition.find_all("a", class_="d_rvd")
            ptma = definition.find(class_="d_ptma")

            return {
                "def": _def.text if _def else None,
                "indic": indic.text if indic else None,
                "syn": [x.text for x in synonyms],
                "text": ptma.text if ptma else None,
            }

        def get_definition(word):
            url = BASE_URL + word
            response = session.get(url)
            if not response.ok:
                return

            soup = BeautifulSoup(response.text, "html.parser")
            soup = soup.find(id="definitions")
            if not soup:
                return
            
            definitions = soup.find_all(class_="b")
            if len(definitions) != 1:
                return

            definition = definitions[0]
            if definition.find(class_="d_dvr"):
                return

            if len(definition.find_all(class_="d_dfn")) != 1:
                return

            kind = definition.find(class_="d_cat")
            title = definition.h3.text
            words = [x.split("\n")[0] for x in title.split("Définition de \n")[1].split(", ")]
            return {**parse_definition(definition.find(class_="d_dvn") or definition), "kind": kind.text if kind else None, "words": words}


        try:
            definitions = {}
            for i in tqdm(range(0, len(words), BATCH_SIZE)):
                if i // 1000 <= ALREADY_DONE:
                    continue

                if (i % SAVE_EVERY_N_WORDS) == (SAVE_EVERY_N_WORDS - BATCH_SIZE):
                    with open(f"db_builder/data/definitions/_definitions_{i // SAVE_EVERY_N_WORDS}.json", "w") as f:
                        json.dump(definitions, f, indent=2)
                        definitions = {}

                batch = words[i:i+BATCH_SIZE]
                with Pool(N_THREADS) as pool:
                    results = pool.map(get_definition, batch)
                    for word, result in zip(batch, results):
                        if result:
                            definitions[word] = result

        except BaseException as e:
            print(e)

if __name__ == "__main__":
    main()
