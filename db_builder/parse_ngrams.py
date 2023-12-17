import json

def main():
    with open("db_builder/data/ngrams.json") as f:
        d = json.load(f)

    l = sorted([(v[-1], k) for k, v in d.items()])
    with open("db_builder/data/ngrams.txt", "w") as f:
        f.write("\n".join([": ".join((x[1], str(x[0] * 1e6))) for x in l]))

if __name__ == "__main__":
    main()
