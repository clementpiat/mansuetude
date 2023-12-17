import json
import requests
from requests_ip_rotator import ApiGateway
from tqdm import tqdm
from multiprocessing.pool import ThreadPool as Pool


BASE_URL = "https://books.google.com/ngrams/json?corpus=fr-2019&smoothing=50"
BATCH_SIZE = 100
N_THREADS = 2

def main():
    with open("usito.txt") as f:
        words = [x for x in f.read().split("\n")]
        print(f"{len(words)} words\n")

    with ApiGateway("https://books.google.com") as g:
        session = requests.Session()
        session.mount("https://books.google.com", g)

        def get_timeseries(word):
            url = BASE_URL + "&content=" + word
            response = session.get(url).json()

            if response == []:
                return

            timeseries = response[0]["timeseries"]
            return [x for i, x in enumerate(timeseries) if i % 20 == 0]


        try:
            ngrams = {}
            for i in tqdm(range(0, len(words), BATCH_SIZE)):
                batch = words[i:i+BATCH_SIZE]
                with Pool(N_THREADS) as pool:
                    results = pool.map(get_timeseries, batch)
                    for word, result in zip(batch, results):
                        if result:
                            ngrams[word] = result

            with open(f"ngrams.json", "w") as f:
                json.dump(ngrams, f)
            
        except BaseException as e:
            print(e)

if __name__ == "__main__":
    main()
