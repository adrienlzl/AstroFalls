export interface meteorite {
    _id?: string;
    name: string;
    id: number;
    nametype: string;
    recclass: string;
    mass_g?: number | null; // Permet de gérer des valeurs manquantes ou nulles
    fall: string;
    year?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    GeoLocation?: string | null;
}