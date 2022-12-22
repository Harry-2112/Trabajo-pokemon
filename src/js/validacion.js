const login = document.getElementById("login");
const inputs = document.querySelectorAll("#login input");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	// nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,20}$/, // 4 a 12 digitos.
	// correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	// telefono: /^[9]\d{8}$/ // 9 numeros.
};

const campos = {
	usuario: false,
	password: false,
};

const validarlogin = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, "usuario");
			break;
		case "password":
			validarCampo(expresiones.password, e.target, "password");
			break;
	}
};

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove("login__grupo-incorrecto");
		document
			.getElementById(`grupo__${campo}`)
			.classList.add("login__grupo-correcto");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add("fa-check-circle");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove("fa-times-circle");
		document
			.querySelector(`#grupo__${campo} .login__input-error`)
			.classList.remove("login__input-error-activo");
		campos[campo] = true;
	} else {
		document
			.getElementById(`grupo__${campo}`)
			.classList.add("login__grupo-incorrecto");
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove("login__grupo-correcto");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add("fa-times-circle");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove("fa-check-circle");
		document
			.querySelector(`#grupo__${campo} .login__input-error`)
			.classList.add("login__input-error-activo");
		campos[campo] = false;
	}
};

inputs.forEach((input) => {
	input.addEventListener("keyup", validarlogin);
	input.addEventListener("blur", validarlogin);
});

login.addEventListener("submit", (e) => {
	e.preventDefault();

	if (campos.usuario && campos.password) {
		login.reset();

		document
			.getElementById("login__mensaje-exito")
			.classList.add("login__mensaje-exito-activo");
		setTimeout(() => {
			document
				.getElementById("login__mensaje-exito")
				.classList.remove("login__mensaje-exito-activo");
		}, 5000);

		document.querySelectorAll(".login__grupo-correcto").forEach((icono) => {
			icono.classList.remove("login__grupo-correcto");
		});
	} else {
		document
			.getElementById("login__mensaje")
			.classList.add("login__mensaje-activo");
	}
});
