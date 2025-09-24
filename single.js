 const pageParams = new URLSearchParams(window.location.search)
 const name = pageParams.get("id")
 let pokInfo = [];
 const Obody = document.getElementById("container")
 let tipos = []

iniciar()


async function iniciar() {
  await buscarDados();
  console.log(pokInfo);
  _percorrertipos()
  console.log(tipos)
  Obody.innerHTML =`<div class="pokemon-name"><h1>${pokInfo.name}</h1></div>
      <div class="pokemon-images">
        <div class="grid-item">
          <img src="${pokInfo.sprites.back_default}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.back_female}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.back_shiny}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.back_shiny_female}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.front_female}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.front_shiny}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.front_shiny_female}" alt="" />
        </div>
        <div class="grid-item">
          <img src="${pokInfo.sprites.back_default}" alt="" />
        </div>
      </div>
      <div class="pokemon-infos">
        <h3 class="tipo">Tipo: ${tipos[0]} ${tipos[1] !== undefined ? tipos[1] : ""}</h3>
        <h3 class="fraqueza">Fraqueza: chão</h3>
      </div>
      <div class="stats" id="stats">
      </div>`

      const stats = document.getElementById("stats")
      
      pokInfo.stats.forEach(element => {
        console.log(element.stat.name)
        const novaDiv = document.createElement("div")
        const titulo = document.createElement("h3");
        const estado = document.createElement("h3");
        titulo.textContent = element.stat.name;
        estado.textContent = element.base_stat;
        novaDiv.appendChild(estado);
        novaDiv.appendChild(titulo);
        stats.appendChild(novaDiv)
      });
     

}

 async function buscarDados() {
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const dados = await resposta.json();
     console.log(dados.name)
     pokInfo = dados
  } catch (erro) {
    console.error('Erro ao buscar Pokémon:', erro);
  }
}

          
function _percorrertipos(){
  pokInfo.types.forEach(element => {
  tipos.push(element.type.name)
  });
}