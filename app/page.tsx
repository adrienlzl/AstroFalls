import meteoriteData from '../lib/mock-data/data_meteorites_new.json'
import MenuBarComponent from "@/components/menu-bar-component";
import FooterComponent from "@/components/layout/footer.component";

export default function Home() {


  return (
    <div className={""}>
      <MenuBarComponent data = {meteoriteData} />
        <FooterComponent/>
    </div>
  );
}
