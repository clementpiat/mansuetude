"use client";

export default function NAModal(props) {
    return (
        <div id="not-available-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-[40vw] max-h-full">
                <div class="relative bg-slate-50 rounded-lg shadow">
                    <div class="flex items-center justify-between p-3 md:p-4 rounded-t">
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="not-available-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div class="px-[3vw] pb-[6vh]">
                        <p class="text-lg text-slate-700">
                           Cette fonctionnalité n'est pas encore disponible.
                           En l'état, les mots enregistrés sont stockés dans le navigateur.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}