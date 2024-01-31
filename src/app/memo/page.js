import { promises as fs } from "fs";
import SavedWords from "../components/SavedWords"


export default async function Memo() {
  const file = await fs.readFile("public/definitions.json", "utf8");
  const definitions = JSON.parse(file);

  return (
    <main className="flex h-[80vh] flex-col items-center justify-between custom-bg">
      <SavedWords definitions={definitions}></SavedWords>
    </main>
  )
}
