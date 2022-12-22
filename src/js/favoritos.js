let container = document.getElementById("content-cards");
let id_user = JSON.parse(localStorage.getItem("usuario_id"));
//almacenamiento pokemon favoritos
const llamar = () => {
	fetch(`https://user-pokemon.up.railway.app/api/users/${id_user}`)
		.then((data) => data.json())
		.then((res) => favoritos(res.favorites));
};

llamar();

function favoritos(element) {
	let urlP = "https://pokeapi.co/api/v2/pokemon/";
	let arrFavoritos = element.split("-");
	arrFavoritos.forEach((id_p) => {
		fetch(`${urlP}${id_p}`)
			.then((data) => data.json())
			.then((response) => {
				//creacion de card
				let card = document.createElement("div");
				let img = document.createElement("img");
				let nombre = document.createElement("h2");
				container.append(card);
				card.className = "card";
				card.append(img);
				img.src = response.sprites.front_default;
				card.append(nombre);
				nombre.textContent = response.name;
			});
	});
}

//array con los id
/*
let data = JSON.parse(localStorage.getItem("PokFav"));
let keysP = [];
data.forEach((element) => {
	keysP.push(element.id_pokemon);
});

//cards
let container = document.getElementById("content-cards");
keysP.forEach((pokemon) => {
	//fetch de data pokemons
	let urlP = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
	fetch(urlP)
		.then((data) => data.json())
		.then((res) => {
			console.log(res);
			//creacion de card
			let card = document.createElement("div");
			let img = document.createElement("img");
			let nombre = document.createElement("h2");
			container.append(card);
			card.className = "card";
			card.append(img);
			img.src = res.sprites.front_default;
			card.append(nombre);
			nombre.textContent = res.name;
		});
});

/*

data.foreach((element)=>{
	let card = document.createElement('div');
	container.append(card)
	card.className="card";

})*/
