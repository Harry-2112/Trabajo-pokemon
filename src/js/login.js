let btn = document.getElementById("btn");

async function peticion() {
	event.preventDefault();
	await fetch("https://user-pokemon.up.railway.app/api/users")
		.then((res) => res.json())
		.then((data) => {
			autenticar(data);
		});
}

async function autenticar(datos) {
	let Formulariouser = document.getElementById("usuario").value;
	let users = [];
	await datos.forEach((element) => {
		users.push({
			id: element._id,
			user: element.user,
			password: element.password,
		});
	});
	let userElement = [];
	for (let i = 0; users.length > i; i++) {
		let element = users[i];
		let usersValid = element.user == Formulariouser;
		if (usersValid == true) {
			userElement.push(element);
		}
	}
	localStorage.setItem("usuario_id", JSON.stringify(userElement[0].id));
	if (userElement.length != 0) {
		elementoValidacion(JSON.stringify(userElement));
	} else {
		alert("usuario no encontrado");
	}
}

function elementoValidacion(params) {
	let vadidacionusuario = document.getElementById("usuario").value;
	let validacioncontraseña = document.getElementById("password").value;
	let validarElemet = JSON.parse(params)[0];
	if (
		vadidacionusuario == validarElemet.user &&
		validacioncontraseña == validarElemet.password
	) {
		window.location.href = "../../templates/logeado/inicio.html";
	} else {
		alert("esa no es la contraseña");
	}
}

btn.addEventListener("click", () => {
	peticion();
});
