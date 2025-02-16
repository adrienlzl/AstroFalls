import FooterComponent from "@/components/layout/footer.component";
import MenuBarComponent from "@/components/menu-bar.component";
import { getAllMeteorite } from "@/lib/action/meteorite.action";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";


export default async function Home() {
	const meteoriteData: Meteorite[] = await getAllMeteorite();

	return (
		<div className="grid min-h-screen">
			<MenuBarComponent data={meteoriteData}/>
			<FooterComponent />
		</div>
	);
}
