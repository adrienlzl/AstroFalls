import {Meteorite} from "@/lib/interfaces/meteorite-interface";
import GraphYearByLength from "@/components/all-chart/chart-year-lenght";
import GraphYearByMass from "@/components/all-chart/chart-year-mass-component";
import ChartYearFallNotFall from "@/components/all-chart/chart-year-fall-not-fall";


export default function TimelapsComponent({meteorites}: { meteorites: Meteorite[] }) {

    return (
        <div className="">
            <GraphYearByLength meteorites={meteorites}/>
            <div className="my-12">
                <GraphYearByMass meteorites={meteorites}/>
            </div>
            <div className="mb-12">
                <ChartYearFallNotFall meteorites={meteorites}/>
            </div>

        </div>
    )
}