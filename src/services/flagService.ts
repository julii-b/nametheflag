import {retrieveCountryAlias} from './countryAliasService.ts';

import type {Flag} from './../types';

/**
 * Asynchonously loads an Array of flag URLs with the corresponding country names.
 * 
 * Loads an Array of the type Flag[] with all countries of the world.
 * Uses the flagcdn.com API for the flags and the retrieveCountryAliases() function for the country name aliases.
 * Filters out US and UK states and the EU.
 * 
 * @returns {Promise<Flag[]>} Array of the type Flag[] with all countries of the world, their flag image URLs, and name aliases.
 */
export const retrieveFlags = async (): Promise<Flag[]> => {

    // example data for testing:
    let flags: Flag[]  = [
        /*{ names: ["Belgium"], url: "https://flagcdn.com/w320/be.png" },
        { names: ["China"], url: "https://flagcdn.com/w320/cn.png" },
        { names: ["France"], url: "https://flagcdn.com/w320/fr.png" },
        { names: ["Germany"], url: "https://flagcdn.com/w320/de.png" },
        { names: ["Luxembourg"], url: "https://flagcdn.com/w320/lu.png" },
        { names: ["Netherlands", "Holland"], url: "https://flagcdn.com/w320/nl.png" },
        { names: ["Nigeria"], url: "https://flagcdn.com/w320/ng.png" },
        { names: ["United States of America", "USA", "US"], url: "https://flagcdn.com/w320/us.png" }*/
    ]

    try {
        // Fetch all available flags:
        let response = await fetch('https://flagcdn.com/en/codes.json');
        let data = await response.json();
        // Remove US states, UK countries, UN, and EU:
        data = Object.entries(data).filter(([countryCode]) => 
            !countryCode.includes('us-') &&
            !countryCode.includes('gb-') &&
            countryCode !== 'eu' &&
            countryCode !== 'un'
        )
        // Map to Flag type:
        flags = data.map(([countryCode, countryName]: [countryCode: string, countryName: string]): Flag => ({
            countryCode,
            commonName: countryName,
            names: [countryName],
            url: 'https://flagcdn.com/w320/'+countryCode+'.png'
        }));
        
        
        // Retrieve aliases for all countries:
        const aliasPromises = flags.map( (flag) => {
            return retrieveCountryAlias(flag.countryCode);
        });
        const aliasResults = await Promise.all(aliasPromises);
        // Combine aliases with flag data:
        for (let i = 0; i < flags.length; i++) {
        flags[i].names = aliasResults[i];
        }

        console.log(flags);


    } catch (error) {
        console.error("Failed to load:", error);
    }
    
    return flags;
};