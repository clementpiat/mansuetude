import requests
from bs4 import BeautifulSoup


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

if __name__ == "__main__":
    main()
