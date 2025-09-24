const pageParams = new URLSearchParams(window.location.search)
const name = pageParams.get("pokemon")
const container = document.getElementById("resultado");
const btnProx = document.getElementById("proximaPagina")
const pageCount = document.getElementById("page-count")
const btnPrev = document.getElementById("pagina-anterior")
const inputA = document.getElementById("inp")
let todosPokemons = [];
let carregados = 0;
let termo2 = ""
let pagination = 12
let paginaAtual = 0
let Allpages = 0
_main()
_liveSearch()

function _main() {
    if (!name == "") {
      inputA.value = name
      _lerdata(name)
    }else{
      _notFound()
    }
    
}

function _lerdata(pokem) {    
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(res =>{
            if (!res.ok) throw new Error("Pokémon não encontrado");
            return res.json();
    })

    .then(data => {
        todosPokemons = data.results; 
        _montargrid(pokem)
    })
    //tratamento de erro
    .catch(err => {
            console.log(err.message)
            });

    
}


function _montargrid(termo) {
  container.innerHTML = ""; 
  spinner.style.display = "block"; 
  carregados = 0;
  termo2 = termo
  if (filtrarPokemons(termo).length > 0){
      filtrarPokemons(termo).forEach((element,i) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
          .then(res => {
            if (!res.ok) throw new Error("Pokémon não encontrado");
            return res.json();
          })
          .then(data => {
            Allpages = filtrarPokemons(termo).length
            if (paginaAtual == 0) {
              if(Allpages > pagination){
              btnProx.style.display = ""
            }
              if (i < pagination) {
               _gridHtml(data)
              }

            }
            if(paginaAtual > 0){
              if (i >= pagination*paginaAtual && i < pagination*paginaAtual + pagination) {
               _gridHtml(data)
              }
            }
            _spinner()
            
          })
          .catch(err => {
            console.error("Erro ao buscar Pokémon:", err);
            _spinner()
          });
      });
}else{
  _notFound()
}
}


function _liveSearch() {
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
         document.getElementById('meuFormulario').submit()
        }
      
      }, 300)); 
}

function _notFound() {
  spinner.style.display = "none";
   const container2 = document.getElementById("mainDiv");
   container2.innerHTML = '<h1 style="text-align: center; color:#c4c4c4">Nenhum Pokemon Encontrado!!!</h1>';
}

function _gridHtml(data) {
   const html = `
              <div class="item-content"  onclick="window.location.href='single.html?id=${data.name}'" >
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <h3 class="item-name">${data.name}</h3>
              </div>
            `;
            container.innerHTML += html;
}

function _spinner() {
   carregados++;
            if (carregados === filtrarPokemons(termo2).length) {
              spinner.style.display = "none";
            }
}

function filtrarPokemons(termo) {
  const termoLimpo = termo.trim().toLowerCase();//joga tudo pra minusculo e limpa os espaços
  return todosPokemons.filter(p => p.name.includes(termoLimpo)); //aqui filtra dentro da array e retorna uma nova array só com os resultados
  debugger
}

function _pagination() {
  console.log(Allpages/pagination)
 if(paginaAtual < Allpages / pagination){
    btnPrev.style.display = ""
    paginaAtual += 1
    _main()
    pageCount.textContent = paginaAtual.toString() + " of " + parseInt(Allpages/pagination).toString()
    if(paginaAtual ==  parseInt(Allpages/pagination)){
      btnProx.style.display = "none"
    }
 }
  
}

function _pagination_prev() {
 if(paginaAtual >= 0){
    paginaAtual -= 1
    _main()
    pageCount.textContent = paginaAtual.toString() + " of " + parseInt(Allpages/pagination).toString()
    if(paginaAtual ==  0){
      btnPrev.style.display = "none"
    }
 }
  
}




    


