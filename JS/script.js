const pokemonImg = document.querySelector('.pokemon_image')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name')
const inputSearch = document.querySelector('.input_search')
const form = document.querySelector('.form')
const btnPrev = document.querySelector('.btn_prev')
const btnNext = document.querySelector('.btn_next')

let searchPokemon = 1

const fetchPokemon = async (pokemon)=>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status === 200){
        
        const data = APIResponse.json()
    
        return data

    }

    
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Carregando...'

    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data){

        pokemonImg.style.display = 'block'
        
        pokemonName.innerHTML = data.name
    
        pokemonNumber.innerHTML = data.id
    
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        inputSearch.value = ''

        searchPokemon = data.id

    } else {

        pokemonImg.style.display = 'none'

        pokemonName.innerHTML = 'Não encontrado :c'

        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event)=>{

    event.preventDefault()

    renderPokemon(inputSearch.value.toLowerCase())
})

btnPrev.addEventListener('click', ()=>{

    if(searchPokemon > 1){
        
        searchPokemon -= 1
     
        renderPokemon(searchPokemon)

    }
})

btnNext.addEventListener('click', ()=>{

    if(searchPokemon < 649){
        
        searchPokemon += 1
    
        renderPokemon(searchPokemon)

    }
})

renderPokemon(searchPokemon)
