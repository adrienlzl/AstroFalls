import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import ChartFallsByCountry from "@/components/all-charts/chart-falls-by-country.component";
import ChartFallsByHemisphere from "./all-charts/chart-falls-by-hemisphere.component";
import ChartFallsByYear from "@/components/all-charts/chart-falls-by-year.component";
import ChartFallsByYearAfter1974 from "@/components/all-charts/chart-falls-by-year-after-1974.component";
import ChartCountFallByMonth from "./all-charts/chart-count-fall-by-month.component";
import ChartCountFindByMonth from "./all-charts/chart-count-find-by-month.component";
import ChartTotalByType from "@/components/all-charts/chart-total-mass-by-type.component";
import ChartTotalMassByType from "@/components/all-charts/chart-total-by-type.component";
import ChartTotalMassByYear from "@/components/all-charts/chart-total-mass-by-year.component";


export default function ChartsComponent({meteorites}: { meteorites: Meteorite[] }) {
	return (
		<div id="charts">
			<ChartFallsByYear meteorites={ meteorites }/>
			<ChartFallsByYearAfter1974 meteorites={ meteorites }/>
			<ChartTotalMassByYear meteorites={ meteorites }/>
			<ChartCountFindByMonth meteorites={ meteorites }/>
			<ChartCountFallByMonth meteorites={ meteorites }/>
			<ChartFallsByCountry meteorites={ meteorites }/>
			<ChartTotalMassByType meteorites={ meteorites }/>
			<ChartTotalByType meteorites={ meteorites }/>
			<ChartFallsByHemisphere meteorites={ meteorites }/>
		</div>
	)
}
