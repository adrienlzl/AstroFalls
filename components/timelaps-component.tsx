import {Meteorite} from "@/lib/interfaces/meteorite-interface";
import GraphYearByLength from "@/components/all-chart/chart-year-lenght";
import GraphYearByMass from "@/components/all-chart/chart-year-mass-component";
import ChartYearFallNotFall from "@/components/all-chart/chart-year-fall-not-fall";
import ChartCountryByNumber from "@/components/all-chart/chart-country-counter.component";
import GraphMeteoriteByType from "@/components/all-chart/chart-meteorite-by-type.composent";
import OverviewDashboard from "@/components/overview-dashbord.composent";
import GraphMassByType from "@/components/all-chart/chart-masse-by-type.component";


export default function TimelapsComponent({meteorites}: { meteorites: Meteorite[] }) {

    return (
        <div className="">
            <GraphYearByLength meteorites={meteorites}/>
            <div className="my-12">
                <GraphYearByMass meteorites={meteorites}/>
            </div>
            <div className={"mb-12"}>
                <ChartCountryByNumber meteorites={meteorites}/>
            </div>
            <div className={"mb-12"}>
                <GraphMeteoriteByType meteorites={meteorites}/>
            </div>
            <div className={"mb-12"}>
                <GraphMassByType meteorites={meteorites}/>
            </div>

        </div>
    )
}