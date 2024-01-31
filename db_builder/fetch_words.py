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

def main3():
    s = "emphatique\nEmpreint de solennité\navaliser\nCautionner\nAgréger\nRéunir\nÉtalonner\nCalibrer\navanie\naffront\nFreindre\nSimuler\nÉchelonner\nÉtaler\nDéclaratif\nAffirmatif\nConcourir à\nContribuer à\nÉcheveau\ndédale\nObérer\nCompromettre\nDiligenter\nActiver\nsurseoir\nReporter\nMièvre\nFade\nabhorrer\ndétester\nproroger\nprolonger\ninterceder\nIntervenir\nPérorer\ndiscourir de manière prétentieuse\nleurrer\ntromper\nFlagornerie\nFlatterie\nDéférence\nRespect\nUsurper\ns'approprier\najourner\nReporter\nAvenant\nAjout\nÉclectique\nqui apprécie les choses diverses\ncirconspect\nprudent\nRécriminer\nCritiquer\nobséquieux\nFlatteur\nPréempter\nExiger d'être propriétaire\nspéculer sur\nCompter dessus pour réussir\npalabre\nDiscussion\nsérendipité\nart de faire une découverte par hasard\nMimétisme\nImitation\npalliatif\nQui prend fin\nincongru\nInconvenant\nDésinvolture\nLaissez-aller\nCirculaire\nNote écrire\nSymptomatique\nSignificatif\nintimer\nEnjoindre\nEuphémisme\nVérité atténuée\nAlacrité\nGaieté\nConjoncture\ncirconstance\nHeuristique\nIntuitif\nÉmulation\nSaine compétition\nprosaique\nTerre à terre\nConsensuel\nQui est admit par tous\nAnthologie\nRecueil de morceaux choisis\nFlouer\nTromper\nPréhension\nPrise\ndisert\nÉloquent\nÉcrêter\nEnlever ce qui dépasse\nAbnégation\nDévouement\nDéflorer\nGâcher le suspens\nS'arroger\nS'attribuer\nprosélytisme\nZèle à convertir\nEncenser\nLouer\nHiatus\nDécalage\nSynergie\nassociation\nÉcueil\nObstacle\nGrief\nMotif de plainte\nAbonder\napprouver pleinement\nConsortium\nGroupement\nArborescence\nClassement en branche\ndispendieux\nOnéreux\nPersona non grata\nPersonne qui n'est pas la bien venue\ndessein\nprojet\nStatu quo\nSituation qui ne progresse pas\nvacuité\nVide\nPis-aller\nSolution de fortune\nRécursivement\nDe manière répétée\nAliéner\nAttirer l'hostilité\nAd hominem\nPersonnel\nparcellaire\nFragmentaire\nÉdifiant\nInstructif\nse formaliser\nÊtre choqué\nSe départir\nRenoncer\nStoïque\nInébranlable\nRedondant\nSuperflu\nConspuer\nHuer\narcanes\nMystère\nCongruent\nQui s'applique bien\nExecrer\nHaïr\nExégèse\nAnalyse très fouillée\ninvectiver\ninjurier\nLogorrhée\nDiscours long et creux\nPréposer\nCharger\nDélétère\nnuisible\nCoercitif\nContraignant\nÉlaguer\nCouper\nFortuitement\nPar hasard\nindigent\nPauvre\nParadigme\nRéférentiel\nabscons\nIncompréhensible\nSystémique\nOrganique\ncontentieux\nEnsembles de litiges\nHomologuer\nApprouver\nModique\nInsignifiant\ncontractuellement\nPar obligation conventionnelle\nDialectique\nArt de l'argumentation\nTacite\nInexprimé\nPré carré\nTerritoire\ndélictueux\nqui constitue un délit\nDéliter\nDécomposer\nVentiler\nRépartir\nentériner\nvalider\nIndûment\nA tort\nmagnanime\nClément\nArguer\nPrétexter\ndithyrambique\nélogieux\nenjoindre\nordonner\ninvoquer\nArguer\nexhorter\nInciter\nPugnace\ncombatif\nTautologie\nRedondance\nÉlite\nFine fleur\nalchimie\nBrassage harmonieux\ndévolu\nAttribué\nTaxinomie\nclassification\nPléthorique\nabondant\nPresomptueux\nPrétentieux\nabsoudre\nPardonner\nPutatif\nprésumé\nexpectative\nAttente\ngageure\nDéfi\nCollusion\nConnivence\nArriviste\nOpportuniste\nEntremise\nIntervention de médiation\nIrrévérencieux\ninsolant\nSubliminal\nSubconscient\nDévoyer\npervertir\nassentiment\nApprobation\nOmnipotent\nTout puissant\ndémériter\nSe rendre indigne\nStricto sensu\nAu sens strict\nacculé\nContraint\nCooptation\nDésignation par les membres d'un groupe\nComminatoire\nmenaçant\nPrisme\nAngle différent\nDogmatique\nQui n'admet pas de contradiction\nexpédient\nAstuce qui ne règle pas le prob\nÉlucubration\nDivagation\nquidam\nIndividu\nSubodorer\npressentir\nCaduc\nPérimé\nPoncif\nCliché\nMoratoire\nSuspension d'un projet\nInertie\nSans énergie\nDisruptif\nQui change la donne\nAchoper\nButer\nAmbivalence\nAmbiguïté\nGalvaudé\nDéprécié\nÉpars\nÉparpillé\nÉluder\nesquiver\niteratif\nQui se produit de façon répétée\nDiatribe\nCritique violante\nCandeur\nNaïveté\nCorolaire\nConséquence\ntemporiser\nRetarder\nproactif\nQui anticipe\nsubrepticement\nen cachette\nImpassible\nImperturbable\npontifier\nParler de manière théâtral\nDoxa\nOpinion commune\nCanonique\nQui pose une règle\nEn dilettante\nEn amateur\nExpurger\nÉliminer\nÉmargement\nApposition d'une mention\nJalon\nRepère\nMutisme\nSilence d'un individu\nOmniscient\nSavant\namender\naméliorer\nSempiternel\nÉternel\ninféodé\nSoumis\nCompulser\nConsulter\nAcrimonie\nAgressivité\nOnirique\nImaginaire\nRétif\nrebelle\nTergiverser\nRecourir à des faux-fuyants\nImpavide\nSans crainte\ninfirmer\nInvalider\nvicié\npollué\nAmène (adj)\nAimable\nDidactique\nPédagogique\nexsangue\nVidé de sa substance\nsubséquemment\nEn conséquence\nPostulat\nPrincipe\nEquanimité\nSévérité\nS'enquérir\nSe renseigner\nPensum\nCorvée\nprobité\nHonnêteté\nMansuétude\nIndulgence\nContingence\nChose de peu d'importance\nastreindre\nObliger\nAd hoc\nAdéquat\nsentencieux\nsolennel\nKyrielle\nMultitudes\nopiniâtre\nobstiné\nSubside\nSomme donnée ou prêtée\nFaire valoir\nPersonne qui met les autre en avant\natermoyer\ndifférer\nPérégrination\nDéplacement incessants\nErgonomique\nAdapté aux besoins des utilisateurs\nVicissitudes\nTurbulences\nDénoter\nindiquer par une caractéristique\nmythifier\nIdéaliser\nDissident\nDésaccord\nRétractation\nAnnulation d'un engagement\nFaconde\ngrande facilité à parler\nvindicatif\nrancunier\nNébuleux\nconfus\ndébonnaire\nAccommodant\nDigression\nFait de s'écarter du sujet\nadouber\nLégitimer dans sa fonction\nannihiler\nAnéantir\nimpondérable\nImprévu\nMéandre\nDétour\nErgoter\nPinailler, chicaner\npourvoir\nFournir\ndéontologique\nÉthique\nsibyllin\nEnigmatique\nSubstantiel\nConsidérable\nlapidaire\nD'une concession brutal\ntransiger\nFaire des concessions\nlaconique\nQui s'exprime en peu de mots\nPéremptoire\nCatégorique\nInhérent\nIndissociable\nÉminemment\nExtrêmement\nImprécation\nmalédiction\nLitanie\nÉnumération ennuyeuse\ninhibant\nParalysant\nopprobre\nhonte\ndébouter\nrejeter\nVindicte\nVengeance\nProfane\nNon-initié\nAfférent à\nRelatif à\nGrégaire\nQui suit le groupe\nDépositaire\nQui reçoit la garde\nnonobstant\nmalgré\nRétroactivement\nEn appliquant à des faits antérieurs\nErsatz\nSubstitut de moindre qualité\nÉbaucher\nEsquisser\nImprécation\nMalédiction\nLapalissade\nÉvidence\nDilatoire\nQui cherche à gagner du temps\nCasus belli\nMotif de conflit\nAntépénultième\navant avant dernier\nTransverse\nRegroupant plusieurs domaine\nRécipiendaire\nBénéficiaire\nPéricliter\nDécliner\nPraticien\nQui exerce la profession\nModus vivendi\nAccord permettant de vivre ensemble\nDécati\nDéfraîchi\nNormatif\nQui donne des règles\nInique\nInjuste\nCinématique\nEnchaînement de mouvements\nSolvable\nQui a les moyens de payer ses dettes\nSacerdoce\nVocation\nLiminaire\nPlace en tête de texte\nÉmolument\nSalaire\nImputer\nattribuer\nEsclandre\nscandale\nVolubile\nqui parle beaucoup et avec enthousiasme\nS'acquitter\nPayer\nAcception\nSignification\nMésalliance\nMauvais mariage\nDéprédation\nMalversation\nDiligence\nRapidité\nTributaire\nDépendant\nHaranguer\nDiscours solennellement\nServile\nSoumis\nSuperfétatoire\nQui s'ajoute inutilement\nIn extenso\nIntégralement\nessaimer\nSe répandre\nPermissif\nLaxiste\nAntinomie\nContradiction\nSommité\nPersonne de grande renommée\nÉchéancier\nPlanning\nConcomitant\nSimultanément\nPrédictif\nPrévisionnel\nOutrecuidance\nArrogance\nErratique\nInstable\nPernicieux\nNuisible\nInanité\nFutilité\nInsidieusement\nPerfidement\nLénifiant\nApaisant\nSupputer\nÉvaluer empiriquement\nProlixe\nTrop long dans ses discours ou ses écrits\nNéologisme\nnouveau mot\nTruisme\nBanalité\nRecouvrement\nPerception de ce que est dû\nQuorum\nPrésence minimale\nUbuesque\nGrotesque\nSuperlatif\nExagérer"

    with open("db_builder/data/quizlet_volatire.txt", "w") as f:
        f.write("\n".join(s.split("\n")))


if __name__ == "__main__":
    # main2()
    main3()
