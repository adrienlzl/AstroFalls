import {meteorite} from "@/lib/interfaces/meteorite-interface";
import GraphYearByLength from "@/components/all-chart/chart-year-lenght";
import GraphYearByMass from "@/components/all-chart/chart-year-mass-component";


export default function TimelapsComponent ({meteorites} : {meteorites : meteorite[]}) {

    return (
        <div>
            <GraphYearByLength meteorites={meteorites} />
            <GraphYearByMass meteorites={meteorites} />

        </div>
    )
}