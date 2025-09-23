const pageParams = new URLSearchParams(window.location.search)//pegar o parametro da url
const name = pageParams.get("pokemon")
let todosPokemons = [];
_lerdata(name)

//puxa todos os arrays com objetos da api
function _lerdata(pokem) {    
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")//da o fetch
    .then(res =>{
            if (!res.ok) throw new Error("Pokémon não encontrado");//se a resposta for diferente de verdadeiro ele joga um erro
            return res.json(); // se tiver tudo certo ele retorna  a resposta e converte em json
    })
    //aqui com o json retornado ele ja começa a tratar os dados
    .then(data => {
        todosPokemons = data.results; // joga todos os dados dentro da array declarada no inicio do codigo
        _montargrid(pokem)//chama a função que filtra e monta o grid com o innerhtml
    })
    //tratamento de erro
    .catch(err => {
            console.log(err.message)
            });

    
}

//função pra filtrar o array pelo nome que foi digitado na barra de pesquisas
function filtrarPokemons(termo) {
  const termoLimpo = termo.trim().toLowerCase();//joga tudo pra minusculo e limpa os espaços
  return todosPokemons.filter(p => p.name.includes(termoLimpo)); //aqui filtra dentro da array e retorna uma nova array só com os resultados
}

function _montargrid(termo) {
  const container = document.getElementById("resultado");//aqui é pra pegar a grid onde vai montar no html
  container.innerHTML = ""; // limpa antes de montar
  spinner.style.display = "block"; // mostra o spinner
  let carregados = 0;// serve pra da um count até tudo carregar cada vez que um item carrega ele adiciona mais um 

// aqui ele o array já filtrado com o termo da barra de endereços e dá um novo fetch usando o nome certinho
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
        container.innerHTML += html;// aqui é deveras importante ele pega se não botar mais igual ele só mostra um item do grid
        //aqui ele da um ++ na variavel carregados cada vez q tem uma iteração
        carregados++;
        //compara e quando tiver tudo carregado ele some com o spinner
        if (carregados === filtrarPokemons(termo).length) {
          spinner.style.display = "none"; // esconde quando terminar tudo
        }

      })
      .catch(err => {
        console.error("Erro ao buscar Pokémon:", err);
         carregados++;
        if (carregados === filtrarPokemons(termo).length) {
          spinner.style.display = "none";
        }

      });
  });
}

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const inpele = document.getElementById('inp');

inpele.addEventListener('input', debounce(function(event) {
  if (!event.target.value == ""){
     console.log('Valor atual:', event.target.value);
  _montargrid(event.target.value);
  }
 
}, 300)); // 300ms de espera após o último input








    


