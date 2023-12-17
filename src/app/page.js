import { promises as fs } from "fs";
import Main from "./components/Main"

export default async function Home() {
  const file = await fs.readFile("public/data.json", "utf8");
  const data = JSON.parse(file);

  return (
    <Main data={data}></Main>
  )
}
