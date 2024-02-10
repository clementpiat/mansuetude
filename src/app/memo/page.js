import { promises as fs } from "fs";
import SavedWords from "../components/SavedWords"
import DotNavButton from "../components/DotNavButton";
import SectionSelector from "../components/SectionSelector";


export default async function Memo() {
  const file = await fs.readFile("public/definitions.json", "utf8");
  const definitions = JSON.parse(file);

  return (
    <main className="flex h-[85vh] flex-col items-center justify-between custom-bg">
      {/* <DotNavButton href="/radio" left="true"></DotNavButton> */}
      <SavedWords definitions={definitions}></SavedWords>
      <SectionSelector sectionId="3"></SectionSelector>
    </main>
  )
}
