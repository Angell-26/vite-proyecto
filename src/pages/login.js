import { showDashboard } from "../router/router.js";

export function loginPage() {

    setTimeout(() => {

    const form = document.getElementById("loginForm");
    const correo = document.getElementById("correo");
    const recordar = document.getElementById("recordarme");

    const correoGuardado = localStorage.getItem("correo");

    if (correoGuardado) {
        correo.value = correoGuardado;
        recordar.checked = true;
    }

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if (recordar.checked) {
            localStorage.setItem("correo", correo.value);
        } else {
            localStorage.removeItem("correo");
        }

        showDashboard();

    });

});

    return `
        <div class="container vh-100 d-flex justify-content-center align-items-center">

            <div class="card shadow-lg p-4" style="width:400px; border-radius:15px;">

                <h1 class="text-center text-primary mb-3">
                    WALF
                </h1>

                <p class="text-center text-secondary mb-4">
                    Sistema de Gestión de Mantenimiento
                </p>

                <form id="loginForm">

                    <div class="mb-3">
                        <label class="form-label">Correo</label>

                       <input
                     type="email"
                     id="correo"
                     class="form-control"
                     placeholder="correo@empresa.com"
                     required>
                    </div>

                    <div class="mb-4">
                        <label class="form-label">Contraseña</label>

                        <input
                            type="password"
                            class="form-control"
                            placeholder="********"
                            required>
                    </div>

                    <div class="form-check mb-3">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="recordarme">

                        <label
                            class="form-check-label"
                            for="recordarme">

                            Recordarme

                        </label>

                    </div>

                    <button class="btn btn-primary w-100">
                        Iniciar Sesión
                    </button>

                </form>

            </div>

        </div>
    `;
}