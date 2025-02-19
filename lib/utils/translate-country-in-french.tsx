type CountryNames = {
  [key: string]: string;
};

const countryNames: CountryNames = {
  "Algeria": "Algérie",
  "Antarctica": "Antarctique",
  "Australia": "Australie",
  "India": "Inde",
  "Lybia": "Lybie",
  "Namibia": "Namibie",
  "North West Africa": "Afrique Nord/Ouest",
  "Russia": "Russie"
};


export const getCountryNameInFrench = (countryName: string): string => {
  return countryNames[countryName] || countryName;
};
