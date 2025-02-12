import MenuBarComponent from "@/components/menu-bar.component";
import FooterComponent from "@/components/layout/footer.component";
import {Meteorite} from "@/lib/interfaces/meteorite-interface";
import {getAllMeteorite} from "@/lib/action/meteorite.action";

export default async function Home() {
    const meteoriteData: Meteorite[] = await getAllMeteorite();


    return (
        <div>
            <MenuBarComponent data={meteoriteData}/>
            <FooterComponent />
        </div>
    );
}
