import { promises as fs } from "fs";


export default async function Radio() {
  return (
    <main className="flex h-[80vh] flex-col items-center justify-between custom-bg">
      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ONme_KcoMDI?si=zQVIZsAl1996VgWv&amp;start=1502&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </main>
  )
}
