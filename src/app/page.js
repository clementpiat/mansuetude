import { promises as fs } from "fs";
import ScrollLandingPage from "./components/ScrollLandingPage"

export default async function Home() {
  const file = await fs.readFile("public/data.json", "utf8");
  const data = JSON.parse(file);


  return (
    <ScrollLandingPage data={data}></ScrollLandingPage>
  )
}
