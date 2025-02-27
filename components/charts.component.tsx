import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import ChartFallsByCountry from "@/components/all-chart/chart-falls-by-country.component";
import ChartTotalByType from "@/components/all-chart/chart-total-mass-by-type.component";
import ChartTotalMassByType from "@/components/all-chart/chart-total-by-type.component";
import ChartFallsByYear from "@/components/all-chart/chart-falls-by-year.component";
import ChartFallsByYearAfter1974 from "@/components/all-chart/chart-falls-by-year-after-1974.component";
import ChartTotalMassByYear from "@/components/all-chart/chart-total-mass-by-year.component";


export default function ChartsComponent({meteorites}: { meteorites: Meteorite[] }) {
	return (
		<div id="charts">
			<ChartFallsByYear meteorites={meteorites}/>
			<ChartFallsByYearAfter1974 meteorites={meteorites}/>
			<ChartTotalMassByYear meteorites={meteorites}/>
			<ChartFallsByCountry meteorites={meteorites}/>
			<ChartTotalMassByType meteorites={meteorites}/>
			<ChartTotalByType meteorites={meteorites}/>
		</div>
	)
}
