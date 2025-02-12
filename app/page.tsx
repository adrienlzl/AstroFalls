import meteoriteData from '../lib/mock-data/data_meteorites_new.json';
import MenuBarComponent from "@/components/menu-bar.component";
import FooterComponent from "@/components/layout/footer.component";
import { filteredWeight } from "@/lib/utils/weightConverter.utils";
import {normalizeMeteoriteType} from "@/lib/utils/normalizeMeteoriteType.utils";
import {Meteorite} from "@/lib/interfaces/meteorite-interface";

export default function Home() {
    const enrichedMeteoriteData: Meteorite[] = (meteoriteData as Meteorite[]).map(
        (meteorite: Meteorite) => ({
            ...meteorite,
            // Normalisation du type
            Type: normalizeMeteoriteType(meteorite.Type),
            weightInGrams: filteredWeight(meteorite["Recovered weight"]),
        })
    );



    return (
        <div>
            <MenuBarComponent data={enrichedMeteoriteData} />
            <FooterComponent />
        </div>
    );
}
