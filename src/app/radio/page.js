import { promises as fs } from "fs";
import YoutubeScrollWrap from "../components/YoutubeScrollWrap"
import DotNavButton from "../components/DotNavButton"
import SectionSelector from "../components/SectionSelector";


export default async function Radio() {
  const ytFile = await fs.readFile("public/youtube_links.json", "utf8");
  const youtubeLinks = JSON.parse(ytFile);

  const defFile = await fs.readFile("public/definitions.json", "utf8");
  const definitions = JSON.parse(defFile);

  return (
    <main className="h-[85vh]">
      {/* <DotNavButton href="/fish" left="true"></DotNavButton> */}
      <YoutubeScrollWrap youtubeLinks={youtubeLinks} definitions={definitions}></YoutubeScrollWrap>
      {/* <DotNavButton href="/memo"></DotNavButton> */}
      <SectionSelector sectionId="2"></SectionSelector>
    </main>
  )
}
