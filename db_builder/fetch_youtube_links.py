import requests
from bs4 import BeautifulSoup
from requests_ip_rotator import ApiGateway
from tqdm import tqdm
from multiprocessing.pool import ThreadPool as Pool
from time import sleep
import json


MAX_RETRY = 3
SAVE_EVERY_N_WORDS = 100
ALREADY_DONE = -1


def main():
    with open(f"db_builder/data/definitions.json") as f:
        words = [x for x in json.load(f)]

    with ApiGateway("https://filmot.com") as g:
        session = requests.Session()
        session.mount("https://filmot.com", g)

        youtube_links = {}
        for i, word in tqdm(enumerate(words)):
            batch = i // SAVE_EVERY_N_WORDS
            if batch <= ALREADY_DONE:
                continue

            url = f"https://filmot.com/search/{word}/1?lang=fr&searchManualSubs=1&sortField=viewcount&sortOrder=desc&gridView=1"
            c = 0
            while c < MAX_RETRY:
                try:
                    response = session.get(url)
                    assert response.ok
                    break
                except:
                    c += 1

            if c == MAX_RETRY:
                print(f"Error with word: {word}")
                continue

            soup = BeautifulSoup(response.text, "html.parser")
            items = soup.find(id="playerparrent")

            _links = []
            for item in items.find_all("a", href=True):
                if "https://www.youtube.com/watch?v=" in item["href"]:
                    _links.append(item["href"])

            youtube_links[word] = _links

            if len(youtube_links) == SAVE_EVERY_N_WORDS:
                with open(f"db_builder/data/youtube_links/_youtube_links_{batch}.json", "w") as f:
                    json.dump(youtube_links, f, indent=2)
                    youtube_links = {}
        
        if youtube_links:
            with open(f"db_builder/data/youtube_links/_youtube_links_{batch}.json", "w") as f:
                json.dump(youtube_links, f, indent=2)
                youtube_links = {}


if __name__ == "__main__":
    main()
