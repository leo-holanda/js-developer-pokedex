const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

const maxRecords = 151
const limit = 10
let currentPokemons = []
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToModalContent(pokemon) {
    return `
        <header>
            <span>←</span>
            <span class="close">&times;</span>
        </header>

        <section>
            <div>
                <h2>${pokemon.name}<h2>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <h3>#${pokemon.number}</h3>
        </section>

        <section>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </section>

        <section>
            <p>test</p>
        </section>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        currentPokemons = pokemons
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        attachClickListeners()
    })

}

function openModal() {
    modal.style.display = "block";
            
    const modalCloseButton = document.getElementsByClassName("close")[0];
    modalCloseButton.onclick = function() {
        modal.style.display = "none";
    }
}

function attachClickListeners() {
    document.querySelectorAll(".pokemon").forEach((listItem) => {
        listItem.addEventListener("click", () => {
            const clickedPokemon = currentPokemons.find((pokemon) => pokemon.number == listItem.id)
            modalContent.innerHTML = convertPokemonToModalContent(clickedPokemon)
            openModal()
        })
    }) 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}