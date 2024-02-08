"use client";

export default function NAModal(props) {
    const closeModal = function () {
        document.getElementById("not-available-modal").classList.add("hidden");
        document.getElementById("not-available-overlay").classList.add("hidden");
    };

    return (
        <>
            <section id="not-available-modal" className="first-bg hidden modal w-[80vw] sm:w-[40vw] max-h-[70vh] overflow-scroll min-h-[20vh] top-[15vh] sm:top-[20vh] left-[10vw] sm:left-[30vw] rounded-lg">
                <div class="p-[4vh]">
                    <p className="text-lg text-slate-100 font-bold mb-[2vh]">
À quelle fin ?
                    </p>
                    <p className="sm:text-base text-slate-100 mb-[2vh]">
L’ensemble des données qui vous sont propres se réduit à deux listes de mots, lesquelles sont sobrement stockées sur ce navigateur.
                    </p>
                    <p className="text-slate-100 mb-[4vh]">
Ce choix satisfait le caractère oisif et ladre de son auteur, et lui permet de se parer de quelques vertus, eu égard à l’écologie - aucun serveur supplémentaire ne stocke vos données et n’écoute en permanence vos demandes d’accès* - et au respect de la vie privée.
                    </p>
                    <p className="text-slate-100 text-sm sm:text-sm mb-[2vh]">
* Est-il légitime à disputer de sobriété numérique, celui qui crée du futile énergivore (cette application), quand il pourrait plus sobrement ne rien faire ?
                    </p>
                    <div className="flex-col items-center text-xs sm:text-xs sm:ml-[10vw] italic text-slate-100">
                        <p>
                        La sobriété s’élève entre le gouffre
                        </p>
                        <p>
                        où l’on se jète une ultime fois,
                        </p>
                        <p>
                        et la vallée qui sans peine se souffre,
                        </p>
                        <p>
                        là où les singes vivent comme des rois.
                        </p>
                    </div>
                </div>
            </section>

            <div onClick={closeModal} id="not-available-overlay" className="hidden overlay"></div>
        </>
    )
}