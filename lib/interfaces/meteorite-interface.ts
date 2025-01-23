export interface meteorite {
    _id?: string;
    name: string;
    id: number;
    nametype: string;
    recclass: string;
    weight?: number | null;
    fall: string;
    year?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    GeoLocation?: string | null;
}