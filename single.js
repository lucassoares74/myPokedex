 const pageParams = new URLSearchParams(window.location.search)
 const name = pageParams.get("id")
 let pokInfo = [];

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then(res => {
            if (!res.ok) throw new Error("Pokémon não encontrado");
            return res.json();
          })
          .then(data => {
            pokInfo = data
            console.log(data.types[0].type.name)

         })
            .catch(err => {
            console.error("Erro ao buscar Pokémon:", err);
            
          });
