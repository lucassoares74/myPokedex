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
        <img src="https://img.pokemondb.net/artwork/avif/${pokInfo.name}.avif" alt="" />
      </div>
      <div class="pokemon-infos">
        <h3 class="tipo">Tipo: ${tipos[0]} ${tipos[1] !== undefined ? tipos[1] : ""}</h3>
        <h3 class="fraqueza">id: ${pokInfo.id}</h3>
      </div>
       <div class="informacoes">
        <div class="stats" id="stats"> 
        <h2 style= "text-align: center">Stats</h2>
        </div>
        <div class="stats" id="habi"><h2 style= "text-align: center">Habilidades</h2></div>
        <div class="stats"id="iten"><h2 style= "text-align: center">Items</h2></div>
      </div>`

      const stats = document.getElementById("stats")
      const abil= document.getElementById("habi")
      const iten= document.getElementById("iten")
      pokInfo.stats.forEach(element => {
        console.log(element.stat.name)
        const novaDiv = document.createElement("div")
        const titulo = document.createElement("h3");
        const estado = document.createElement("h3");
        titulo.textContent = element.stat.name + ":";
        estado.textContent = element.base_stat  ;
        novaDiv.appendChild(titulo);
        novaDiv.appendChild(estado);
        stats.appendChild(novaDiv)
      });

      pokInfo.abilities.forEach(element => {
        console.log(element.ability.name)
        const novaDiv2 = document.createElement("div")
        const titulo2 = document.createElement("h3");
        titulo2.textContent = element.ability.name ;
        novaDiv2.appendChild(titulo2);
        abil.appendChild(novaDiv2)
      });

        pokInfo.held_items.forEach(element => {
        console.log(element.item.name)
        const novaDiv3 = document.createElement("div")
        const titulo3 = document.createElement("h3");
        titulo3.textContent = element.item.name;
        novaDiv3.appendChild(titulo3);
        iten.appendChild(novaDiv3)
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