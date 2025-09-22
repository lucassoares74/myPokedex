const pageParams = new URLSearchParams(window.location.search)//pegar o parametro da url
const name = pageParams.get("pokemon")
let todosPokemons = [];

function _lerdata() {    
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(res =>{
            if (!res.ok) throw new Error("Pokémon não encontrado");
            return res.json();
    })
    .then(data => {
        todosPokemons = data.results; // [{ name: "bulbasaur", url: "..." }, ...]
        _montargrid(name)
    })
    .catch(err => {
            console.log(err.message)
            });

    
}

function filtrarPokemons(termo) {
  const termoLimpo = termo.trim().toLowerCase();
  return todosPokemons.filter(p => p.name.includes(termoLimpo));  
}

function _montargrid(termo) {
  const container = document.getElementById("resultado");
  container.innerHTML = ""; // limpa antes de montar

  filtrarPokemons(termo).forEach(element => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
      .then(res => {
        if (!res.ok) throw new Error("Pokémon não encontrado");
        return res.json();
      })
      .then(data => {
        const html = `
          <div class="item-content">
            <img src="${data.sprites.front_default}" alt="${data.name}" />
            <h3 class="item-name">${data.name}</h3>
          </div>
        `;
        container.innerHTML += html;
      })
      .catch(err => {
        console.error("Erro ao buscar Pokémon:", err);
      });
  });
}

function _mudar_termo(novo){


}


_lerdata()





    


