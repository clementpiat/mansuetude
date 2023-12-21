This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## DB Builder
Tentatives 
- parse raw ngrams data : compliqué sans doc
- faire les 300k call api : c'est long sans changement d'IP
    - utiliser le max plutôt, ou garder juste la time series

Solution
- ip-rotator

Tentatives
- Selenium est repéré par openai
- Essayer un script Javascript plutôt OU payer quelques tokens (plus propre, plus cher)

Definition
- Typo en mode machine à écrire

TODO
- HP
    - manifest.json ~V
    - corriger 2 errors V
    - pas de virgule en rose V
    - favicon.ico V
    - degradé de couleurs V
    - ajouter les synonymes V
- LP
    - défintions recursives X
    - lien vers le dictionnaire V
    - petite croix au-dessus de la définition V
    - longueur de phrase maximale V
    - ajouter littéraire dans le générateur gpt X
    - prettier button

- HP
    - scrap https://webnext.fr/dictionnaire-du-francais-difficile-mots-rares-et-recherches-1016.html V
    - 2 pages : une page d'accueil et un lien vers le générateur
    - un pied de page contact
