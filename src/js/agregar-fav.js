let btn_fav = document.getElementById("btn-favorito");
let id_poke = JSON.parse(localStorage.getItem("id_pokemon"));
let id_user = JSON.parse(localStorage.getItem("usuario_id"));

function llamar() {
	let url = "https://user-pokemon.up.railway.app/api/users";
	fetch(`${url}/${id_user}`)
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem("data_user", JSON.stringify(data));
		});
}
llamar();

function editar() {
	let _datos = JSON.parse(localStorage.getItem("data_user"));
	if (_datos.favorites == null) {
		_datos.favorites = id_poke;
	} else {
		_datos.favorites = `${_datos.favorites}-${id_poke}`;
	}
	let url = "https://user-pokemon.up.railway.app/api/users";
	fetch(`${url}/${id_user}`, {
		method: "PUT",
		body: JSON.stringify(_datos),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}
btn_fav.addEventListener("click", () => {
	editar();
	btn_fav.style.display = "none";
	setTimeout(() => {
		window.location.reload();
	}, 3000);
});
