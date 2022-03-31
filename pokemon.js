
//import fetch from 'node-fetch';

//const pokeContent = document.getElementById('pokemonContent');
/*pintar card pokemon*/
const colors = {
    fire: '#FFA05D',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#7E97C0',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#97b3e6',
	psychic: '#FF96B5',
	flying: '#CDCDCD',
	fighting: '#FF5D5D',
	normal: '#FFFFFF'
}
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};
const URI = 'https://pokeapi.co/api/v2/pokemon/'

const getPokemonName = async(e)=>{
    e.preventDefault()

    const inputPokemon = document.getElementById('inputPokemon').value;
	const informacion = await fetch(URI+inputPokemon.toLowerCase())
    
	const info = await informacion.json()
    document.getElementById("name_").innerHTML = info.name;
    document.getElementById('id_').innerHTML = '#0'+info.id;
    const sprite =  info.sprites.front_default;
    document.querySelector('[data-poke-img]').setAttribute('src', sprite);

    
    
    let typebd = document.getElementById('type')
    let typeStr = ''
    info['types'].forEach(element =>
        typeStr += '<span>'+element['type']['name'] +'</span>'
        /*const typeTextElement = document.createElement("span");
        typeTextElement.style.color = typeColors[element.type.name];
        typeTextElement.textContent = element.type.name;
        typebd.appendChild(typeTextElement);*/
    );
    document.getElementById('type').innerHTML =  typeStr
    
    

    const colorOne = typeColors[info['types'][0].type.name];
    const colorTwo = info['types'][1] ? typeColors[info['types'][1].type.name] : typeColors.default;
    document.querySelector('[data-poke-img]').style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    document.querySelector('[data-poke-img]').style.backgroundSize = ' 5px 5px';
    
    /* <p>My mother has <span style="color:blue;font-weight:bold">blue</span> eyes and my father has <span style="color:darkolivegreen;font-weight:bold">dark green</span> eyes.</p>*/
    let stateStr = '<p>'
    info['stats'].forEach(element => 
        stateStr += element['stat']['name']  +'<span>'+element['base_stat'] +'</span>'
        );
    stateStr += '</p>'
    console.log(stateStr)
    document.getElementById('state').innerHTML = stateStr
}

const getPokemonId = async(id)=>{
	const informacion = await fetch(URI+id)
	const info = await informacion.json()
	console.log('name :',info.name)
    console.log('id :',info.id)
    info['types'].forEach(element => 
        console.log('    type:',element['type']['name'])
        );
    info['stats'].forEach(element => 
            console.log(element['stat']['name'],':',element['base_stat'])
            );
    //createPokemon(info, modal)
}


const drawPokemon = async () =>{
    //getPokemonId(2)
    for (let i = 5; i < 7; i++) {
		await getPokemonId(i);
	}
}

//getPokemonName('pikachu')
//drawPokemon()
