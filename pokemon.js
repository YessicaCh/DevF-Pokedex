
import fetch from 'node-fetch';

const pokeContent = document.getElementById('pokemonContent');
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
const URI = 'https://pokeapi.co/api/v2/pokemon/'

const getPokemonName = async(name)=>{
	const informacion = await fetch(URI+name.toLowerCase())
	const info = await informacion.json()
	console.log('name :',info.name)
    console.log('id :',info.id)
    info['types'].forEach(element => 
        console.log('    type:',element['type']['name'])
        );
    info['stats'].forEach(element => 
            console.log(element['stat']['name'],':',element['base_stat'])
            );
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
    createPokemon(info, modal)
}


const drawPokemon = async () =>{
    //getPokemonId(2)
    for (let i = 5; i < 7; i++) {
		await getPokemonId(i);
	}
}

//getPokemonName('pikachu')
drawPokemon()


function  createPokemon(pokemon, modal){
    const pokemonEl = document.createElement('div');
    
	pokemonEl.classList.add('pokemon');
    
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	

	if (modal !==true){
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else{
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;
                

    modalSearch.innerHTML = pokeInnerHTML;
        
    }
}