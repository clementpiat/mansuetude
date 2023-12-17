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
ALREADY_DONE = -1

def parse_definition(definition):
    indic = definition.find(class_="d_mta")
    _def = definition.find(class_="d_dfn")
    syn = definition.find(class_="d_rvd")

    return {
        "def": _def.text if _def else None,
        "indic": indic.text if indic else None,
        "syn": syn.text[1:].split(", ") if syn else [],
    }
def get_definition(word):
    url = BASE_URL + word
    response = requests.get(url)
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

    kind = definition.find(class_="d_cat")
    title = definition.h3.text
    words = [x.split("\n")[0] for x in title.split("Définition de \n")[1].split(", ")]
    return {**parse_definition(definition.find(class_="d_dvn") or definition), "kind": kind, "words": words}


_def = get_definition("plantureux")
print(_def)
