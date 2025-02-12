export interface Meteorite {
    _id?: string;
    "(A)chondrite": string | null; // Achondrite ou Chondrite
    id: number; // Identifiant unique
    Class: string | null; // Classe de la météorite
    Country: string; // Pays où elle a été trouvée
    latitude: number; // Latitude de la localisation
    longitude: number; // Longitude de la localisation
    ff: "Find" | "Fall"; // Type (Find ou Fall)
    Group: string | null; // Groupe de la météorite
    Locality: string; // Localité
    mck: string; // Code météorite
    Month: string | null; // Mois de la découverte
    Name: string; // Nom de la météorite
    "Petrologic type": string | null; // Type pétrologique
    "Recovered weight": string | null; // Poids récupéré avec unités (g, kg)
    "Shock stage": string | null; // Stade de choc
    Synonyms: string | null; // Synonymes ou autres noms
    Type: MeteoriteType | null;
    wg: string | null; // Autres informations
    Year: string; // Année de découverte
}

export type MeteoriteType = "Stone" | "Iron" | "Stony-Iron";
