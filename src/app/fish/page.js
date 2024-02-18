import { promises as fs } from "fs";
import Fishing from "../components/Fishing"
import DotNavButton from "../components/DotNavButton"
import SectionSelector from "../components/SectionSelector";


export default async function Fish() {
    const file = await fs.readFile("public/data.json", "utf8");
    const data = JSON.parse(file);
  

    return (
        <main className="flex flex-col items-center h-[85vh] mt-[5vh] custom-bg">
            <Fishing data={data}></Fishing>
            {/* <DotNavButton href="/radio"></DotNavButton> */}
            <SectionSelector sectionId="1"></SectionSelector>
        </main>
    )
    }
