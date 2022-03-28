
const URI  = 'https://pokeapi.co/api/v2/pokemon/'

const getPokemon = async id =>{
    const response = await fetch(URI+id);
    const pokemon =  await response.json();
}
