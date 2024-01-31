import { promises as fs } from "fs";
import Fishing from "../components/Fishing"


export default async function Fish() {
    const file = await fs.readFile("public/data.json", "utf8");
    const data = JSON.parse(file);
  

    return (
        <main className="flex h-[80vh] flex-col items-center justify-between custom-bg">
        <Fishing data={data}></Fishing>
        </main>
    )
    }
