import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import MeteoritesFallsByCountry from "@/components/all-chart/meteorites-falls-by-country.component";
import MeteoritesTotalByType from "@/components/all-chart/meteorites-total-mass-by-type.component";
import MeteoritesTotalMassByType from "@/components/all-chart/meteorites-total-by-type.component";
import MeteoritesFallsByYear from "@/components/all-chart/meteorites-falls-by-year.component";
import MeteoritesFallsByYearAfter1974 from "@/components/all-chart/meteorites-falls-by-year-after-1974.component";
import MeteoritesTotalMassByYear from "@/components/all-chart/meteorites-total-mass-by-year.component";


export default function ChartsComponent({meteorites}: { meteorites: Meteorite[] }) {
	return (
		<div id="charts">
			<MeteoritesFallsByYear meteorites={meteorites}/>
			<MeteoritesFallsByYearAfter1974 meteorites={meteorites}/>
			<MeteoritesTotalMassByYear meteorites={meteorites}/>
			<MeteoritesFallsByCountry meteorites={meteorites}/>
			<MeteoritesTotalMassByType meteorites={meteorites}/>
			<MeteoritesTotalByType meteorites={meteorites}/>
		</div>
	)
}
