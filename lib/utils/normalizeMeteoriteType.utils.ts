import { MeteoriteType } from "@/lib/interfaces/meteorite-interface";

/**
 * Normalise la valeur d'un type de météorite en renvoyant toujours "Stony-Iron"
 * si la valeur représente ce type, sinon renvoie la valeur inchangée.
 *
 * @param type - Le type de la météorite.
 * @returns Le type normalisé.
 */
export function normalizeMeteoriteType(type: MeteoriteType | null): MeteoriteType | null {
    if (type === null) return null;

    // On compare en minuscules pour capturer "stony-iron" ou "stony-iron"
    if (type.toLowerCase() === "stony-iron") {
        return "Stony-Iron";
    }

    return type;
}
