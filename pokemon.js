
//import fetch from 'node-fetch';

const pokeContent = document.getElementById('pokemonContent');
/*pintar card pokemon*/
const listPokemon = [];

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
    if (listPokemon.length > 0) {
        drawPokemon()
        listPokemon.shift();
    }
    const inputPokemon = document.getElementById('inputPokemon').value;
	const informacion = await fetch(URI+inputPokemon.toLowerCase())
    if (informacion.status == 200){
        const info = await informacion.json()
        document.getElementById("name_").innerHTML = info.name;
        document.getElementById('id_').innerHTML = '#0'+info.id;
        listPokemon.push(info.id);
        const sprite =  info.sprites.front_default;
        document.querySelector('[data-poke-img]').setAttribute('src', sprite);

        
        
        let typebd = document.getElementById('type')
        let typeStr = ''

        info['types'].forEach(element =>
            typeStr += '<span style="color:'+typeColors[element['type']['name']]+';font-weight:bold">'+
                        element['type']['name'] 
                        +'</span>'
        );
        document.getElementById('type').innerHTML =  typeStr
        
        

        const colorOne = typeColors[info['types'][0].type.name];
        const colorTwo = info['types'][1] ? typeColors[info['types'][1].type.name] : typeColors.default;
        document.querySelector('[data-poke-img]').style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
        document.querySelector('[data-poke-img]').style.backgroundSize = ' 5px 5px';
        
        let stateStr = '<p>'
        info['stats'].forEach(element => 
            stateStr += element['stat']['name']  +'<span>'+element['base_stat'] +'</span>'
            );
        stateStr += '</p>'
        console.log(stateStr)
        document.getElementById('state').innerHTML = stateStr
        console.log(listPokemon)
        }
    else{ 
        return
        //renderNotFound() 
    }
    //drawPokemon()
    
}

const getPokemonId = async(id)=>{
	const informacion = await fetch(URI+id)
	const info = await informacion.json()
    createPokemon(info, false)
}


const drawPokemon = async () =>{
    //getPokemonId(2)
    listPokemon.forEach(async (element) => {
             await getPokemonId(element);
          });
}

function  createPokemon(pokemon, modal){
    const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
    
	const poke_types = pokemon.types.map(type => type.type.name);

    const type = poke_types[0]
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = typeColors[type];
	
	pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="${pokemon.sprites.front_default}" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span style="font-weight:bold" >${type}</span></small>
        </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokeContent.appendChild(pokemonEl);
    
}

const renderNotFound = () => {
    document.querySelector('[data-poke-img]').setAttribute('src', 'poke-shadow.png');
    document.querySelector('[data-poke-img]').style.background =  '#fff';
    document.getElementById('type').innerHTML ='';
    document.getElementById('name').innerHTML ='';
    document.getElementById('state').innerHTML ='';
    
}
//getPokemonName('pikachu')
//drawPokemon()