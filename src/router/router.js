import { loginPage } from "../pages/login.js";
import { dashboardPage } from "../pages/dashboard.js";
import { equiposPage } from "../pages/equipos.js";
import { areasPage } from "../pages/areas.js";
import { mantenimientoPage } from "../pages/mantenimiento.js";

const app = document.getElementById("app");

export function showLogin() {
    app.innerHTML = loginPage();
}

export function showDashboard() {
    app.innerHTML = dashboardPage();
}

export function showEquipos() {
    app.innerHTML = equiposPage();
}

export function showAreas() {
    app.innerHTML = areasPage();
}

export function showMantenimiento() {
    app.innerHTML = mantenimientoPage();
}

export function router() {
    showLogin();
}