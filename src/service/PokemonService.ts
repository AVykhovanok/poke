export const fetchPokemon = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching url --> ${url} , error -->:`, error);
    }
}