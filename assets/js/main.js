const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById("modal");

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
    <div class="modal-content ${pokemon.type}">
        <header class="header">
            <img src="${'https://icongr.am/octicons/arrow-left.svg?size=32&color=ffffff'}">
            <img src="${'https://icongr.am/octicons/heart.svg?size=32&color=ffffff'}">
        </header>

        <section class="info">
            <div>
                <h1 class="modal-name">${pokemon.name}</h1>
                <ol class="modal-types">
                    ${pokemon.types.map((type) => `<li class="modal-type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <h3 class="modal-pokemon-id">#${pokemon.number > 100 ? pokemon.number :
                                            pokemon.number > 10 ? `00${pokemon.number}` :
                                            `00${pokemon.number}`}</h3>
        </section>

        <section class="modal-photo">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </section>

        <section class="modal-data">
            <div>
                <h3>Info</h3>
                <table class="modal-info-table">
                    <tbody>
                        <tr>
                            <td class="modal-info-name">Height</td>
                            <td>${pokemon.height}</td>
                        </tr>
                        <tr>
                            <td class="modal-info-name">Weight</td>
                            <td>${pokemon.weight}</td>
                        </tr>
                    </tbody>
                </table>        
            </div>

            <div>
                <h3>Stats</h3>
                <table class="modal-table">
                    <tbody>
                        ${pokemon.stats.map((stat) =>
                            `<tr>
                                <td class="modal-stat">${stat.stat.name}</td>
                                <td class="modal-stat-value">${stat.effort}</td>
                            </tr>`
                        ).join('')}
                    </tbody>
                </table>            
            </div>

            <div>
                <div>
                    <h3>Abilities</h3>
                    ${pokemon.abilities.map((ability) => `<p class="modal-ability">${ability.ability.name}</p>`).join('')}
                </div>
            </div>
        </section>
    </div>
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
    modal.style.display = "flex";
            
    const modalCloseButton = document.getElementsByClassName("close")[0];
    modalCloseButton.onclick = function() {
        modal.style.display = "none";
    }
}

function attachClickListeners() {
    document.querySelectorAll(".pokemon").forEach((listItem) => {
        listItem.addEventListener("click", () => {
            const clickedPokemon = currentPokemons.find((pokemon) => pokemon.number == listItem.id)
            modal.innerHTML = convertPokemonToModalContent(clickedPokemon)
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