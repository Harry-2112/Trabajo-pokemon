const formulario = document.getElementById("formulario");
var error = document.getElementById("error");
const Procesar = (event) => {
	event.preventDefault();

	const datos = new FormData(event.target);
	const datosCompletos = Object.fromEntries(datos.entries());
	console.log(datosCompletos);
	formulario.reset();

	const url = "https://user-pokemon.up.railway.app/api/users";
	fetch(url, {
		method: "POST",
		body: JSON.stringify(datosCompletos),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.then((json) => obtenerID(json))
		.catch((err) => console.log(err));
};
function obtenerID(param) {
	localStorage.setItem("usuario_id", JSON.stringify(param._id));
	window.location.href = "../templates/logeado/inicio.html";
}

function validar() {
	let contraseña = document.getElementById("contraseña").value;
	let RepetirP = document.getElementById("RepetirP").value;
	if (contraseña != RepetirP) {
		event.preventDefault();
		error.style.display = "block";
		error.textContent = "Las contraseñas deven ser iguales";

		setTimeout(() => {
			error.style.display = "none";
			error.textContent = "";
		}, 5000);
	} else {
		formulario.addEventListener("submit", Procesar);
	}
}
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
	validar();
});
