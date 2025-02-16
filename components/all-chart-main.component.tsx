import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import ChartCountryByNumber from "@/components/all-chart/chart-country-counter.component";
import ChartMassByType from "@/components/all-chart/chart-masse-by-type.component";
import ChartMeteoriteByType from "@/components/all-chart/chart-meteorite-by-type.composent";
import ChartYearByLength from "@/components/all-chart/chart-year-lenght";
import ChartYearByLength1974 from "@/components/all-chart/chart-by-lenght-1974.composant";
import ChartYearByMass from "@/components/all-chart/chart-year-mass-component";


export default function AllChartMainComponent({meteorites}: { meteorites: Meteorite[] }) {
	return (
		<div className="w-full">
			<ChartYearByLength meteorites={meteorites}/>
			<div className="my-12">
				<ChartYearByLength1974 meteorites={meteorites}/>
			</div>
			<div className={"mb-12"}>
				<ChartYearByMass meteorites={meteorites}/>
			</div>
			<div className={"mb-12"}>
				<ChartCountryByNumber meteorites={meteorites}/>
			</div>
			<div className={"mb-12"}>
				<ChartMeteoriteByType meteorites={meteorites}/>
			</div>
			<div className={"mb-12"}>
				<ChartMassByType meteorites={meteorites}/>
			</div>
		</div>
	)
}
