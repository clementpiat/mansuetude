import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
from time import sleep


BASE_URL = "https://usito.usherbrooke.ca/index/mots/tous/"


def main():
    words = []
    for letter in "abcdefghijklmnopqrstuvwxyz":
        print(f"Fetching letter {letter}...")
        url = BASE_URL + letter
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")
        _words = [
            x.replace("\n", "") for x in soup.find("ul", class_="entrées").text.split("\n\n\n\n")
        ]
        print(len(_words))
        words += _words

    with open("usito.txt", "w") as f:
        f.write("\n".join(words))


def main2():
    BASE_URL = "https://webnext.fr/dictionnaire-du-francais-difficile-mots-rares-et-recherches-1016.html?page_num="
    words = []
    for page_num in tqdm(range(1, 64)):
        sleep(1)
        url = BASE_URL + str(page_num)
        response = requests.get(url)
        assert response.ok
        soup = BeautifulSoup(response.text, "html.parser")
        items = soup.find("div", {"data-table": "articles"})

        for item in items.find_all("div", class_="bloc_unit"):
            words.append(item.h2.text)

    with open("db_builder/data/webnext.txt", "w") as f:
        f.write("\n".join(words))


if __name__ == "__main__":
    main2()
