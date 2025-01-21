import meteoriteData from '../lib/mock-data/data_meteorites_new.json'
import MenuBarComponent from "@/components/menu-bar-component";

export default function Home() {


  return (
    <div className={""}>
      <MenuBarComponent data = {meteoriteData} />
    </div>
  );
}
