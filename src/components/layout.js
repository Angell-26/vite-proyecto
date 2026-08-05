import { navbar } from "./navbar.js";
import { sidebar } from "./sidebar.js";
import { showDashboard, showEquipos, showAreas } from "../router/router.js";

export function layout(content) {

    setTimeout(() => {

        document.getElementById("btnDashboard")?.addEventListener("click", () => {
            showDashboard();
        });

        document.getElementById("btnEquipos")?.addEventListener("click", () => {
            showEquipos();
        });

        document.getElementById("btnAreas")?.addEventListener("click", () => {
            showAreas();
        });

    });

    return `
        ${navbar()}

        <div class="d-flex">

            ${sidebar()}

            <main class="container-fluid p-4">
                ${content}
            </main>

        </div>
    `;
}