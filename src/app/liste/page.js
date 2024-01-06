import { promises as fs } from "fs";
import SavedWords from "../components/SavedWords"


export default async function List() {
  const file = await fs.readFile("public/definitions.json", "utf8");
  const definitions = JSON.parse(file);

  return (
    <SavedWords definitions={definitions}></SavedWords>
  )
}
