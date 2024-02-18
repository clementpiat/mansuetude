import { promises as fs } from "fs";
import ContentScrollWrap from "../components/ContentScrollWrap"
import DotNavButton from "../components/DotNavButton"
import SectionSelector from "../components/SectionSelector";


export default async function Radio() {
  const ytFile = await fs.readFile("public/youtube_links.json", "utf8");
  const youtubeLinks = JSON.parse(ytFile);

  const defFile = await fs.readFile("public/definitions.json", "utf8");
  const definitions = JSON.parse(defFile);

  return (
    <main className="h-[85vh] mt-[5vh]">
      {/* <DotNavButton href="/fish" left="true"></DotNavButton> */}
      <ContentScrollWrap youtubeLinks={youtubeLinks} definitions={definitions}></ContentScrollWrap>
      {/* <DotNavButton href="/memo"></DotNavButton> */}
      <SectionSelector sectionId="2"></SectionSelector>
    </main>
  )
}
