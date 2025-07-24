/**
 * Asynchronously loads an Array with country name aliases for a country.
 * 
 * Receives the country code of a country and uses the restcountries.com API to load the long and short country names in multiple languages.
 * 
 * @param {string} countryCode - Country code of the country to load the names for.
 * @returns {Promise<string[]>} - Array of country name aliases for this country.
 */
export const retrieveCountryAlias = async (countryCode: string): Promise<string[]> => {
    
    let allNames = new Set<string>();

    try {
        // Fetch all available names:
        let response = await fetch('https://restcountries.com/v3.1/alpha/'+countryCode+'?fields=name,altSpellings,translations');
        let data = await response.json();
        // Collect all names into one set:
        allNames.add(data.name.official); // long English name
        allNames.add(data.name.common); // short Enlish name
        for(let spelling of data.altSpellings) {
            allNames.add(spelling); // native name, ISO code, other ...
        }
        for (let lang in data.translations) {
            allNames.add(data.translations[lang].official); // long translated name
            allNames.add(data.translations[lang].common); // short translated name
        }

    } catch (error) {
        console.error("Failed to load:", error);
    }
    
    return Array.from(allNames);
  };