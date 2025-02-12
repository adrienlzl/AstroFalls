
export function filteredWeight(weight: string | null): number | null {
    if (!weight) return null;

    // Passage en minuscules pour simplifier la détection d'unité
    const weightLower = weight.toLowerCase();

    // Si le poids est en tonnes, on le convertit en kilogrammes (1 t = 1000 kg)
    if (weightLower.includes("t")) {
        const value = parseFloat(weightLower.replace("t", "").trim());
        return isNaN(value) ? null : value * 1000;
    }

    // Si le poids est en kilogrammes, on renvoie directement la valeur
    if (weightLower.includes("kg")) {
        const value = parseFloat(weightLower.replace("kg", "").trim());
        return isNaN(value) ? null : value;
    }

    // Si le poids est en grammes, on le convertit en kilogrammes (1 kg = 1000 g)
    if (weightLower.includes("g")) {
        const value = parseFloat(weightLower.replace("g", "").trim());
        return isNaN(value) ? null : value / 1000;
    }

    // Si le format n'est pas reconnu, on retourne null
    return null;
}
