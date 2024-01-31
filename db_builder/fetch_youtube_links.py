import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
from time import sleep
import json


def main():
    with open(f"db_builder/data/definitions.json") as f:
        words = [x for x in json.load(f)]

    youtube_links = {}
    for word in tqdm(words):
        sleep(1)
        url = f"https://filmot.com/search/{word}/1?lang=fr&searchManualSubs=1&sortField=viewcount&sortOrder=desc&gridView=1"
        response = requests.get(url)
        assert response.ok
        soup = BeautifulSoup(response.text, "html.parser")
        items = soup.find(id="playerparrent")

        _links = []
        for item in items.find_all("a", href=True):
            if "https://www.youtube.com/watch?v=" in item["href"]:
                _links.append(item["href"])

        youtube_links[word] = _links
        break

    with open("db_builder/data/youtube_links.json", "w") as f:
        json.dump(youtube_links, f, indent=2)


if __name__ == "__main__":
    main()
