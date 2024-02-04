"use client";
import Definition from "./Definition";

export default function WordModal(props) {
    const closeModal = function () {
        document.getElementById("word-modal").classList.add("hidden");
        document.getElementById("word-overlay").classList.add("hidden");
      };

    const pick = () => {
        var _learningWords = localStorage.getItem("learningWords");
        _learningWords = _learningWords ? JSON.parse(_learningWords) : [];
        let newLearningWords = _learningWords.concat([props.selectedWord.word]);
        localStorage.setItem("learningWords", JSON.stringify(newLearningWords));

        var _learnedWords = localStorage.getItem("learnedWords");
        _learnedWords = _learnedWords ? JSON.parse(_learnedWords) : [];
        let newLearnedWords = _learnedWords.filter(item => item != props.selectedWord.word);
        localStorage.setItem("learnedWords", JSON.stringify(newLearnedWords));

        props.setLearningWords(newLearningWords);
        props.setLearnedWords(newLearnedWords);

        closeModal();
    }

    const unpick = () => {
        var _learningWords = localStorage.getItem("learningWords");
        _learningWords = _learningWords ? JSON.parse(_learningWords) : [];
        let newLearningWords = _learningWords.filter(item => item != props.selectedWord.word)
        localStorage.setItem("learningWords", JSON.stringify(newLearningWords));

        var _learnedWords = localStorage.getItem("learnedWords");
        _learnedWords = _learnedWords ? JSON.parse(_learnedWords) : [];
        let newLearnedWords = _learnedWords.concat([props.selectedWord.word]);
        localStorage.setItem("learnedWords", JSON.stringify(newLearnedWords));

        props.setLearningWords(newLearningWords);
        props.setLearnedWords(newLearnedWords);

        closeModal();
    }

    return (
        <>
            <section id="word-modal" className="first-bg hidden modal w-[80vw] sm:w-[40vw] min-h-[20vh] top-[30vh] left-[10vw] sm:left-[30vw] rounded-lg">
                <div>
                    <Definition selectedWord={props.selectedWord} modal="true"></Definition>
                    {
                        props.selectedWord && props.selectedWord.learned ?
                        <div className="flex items-center flex-col">
                            <div onClick={pick} className="w-[45%] mb-[5%] mx-[5%] connect-button cursor-pointer px-5 py-3 text-lg font-medium text-center text-slate-100 rounded-xl">
                                <span>
                                    Retravailler ce mot
                                </span>
                            </div>
                        </div>
                        :
                        (
                            props.selectedWord && props.selectedWord.learning ?
                            <div className="flex items-center flex-col">
                                <div onClick={unpick} className="w-[45%] mb-[5%] mx-[5%] generate-button cursor-pointer px-5 py-3 text-lg font-medium text-center text-slate-100 rounded-xl">
                                    <span>
                                        Cueillir le fruit
                                    </span>
                                </div>
                            </div>
                            :
                            <></>
                        )
                    }
                </div>
            </section>

            <div onClick={closeModal} id="word-overlay" className="hidden overlay"></div>
        </>
    )
}