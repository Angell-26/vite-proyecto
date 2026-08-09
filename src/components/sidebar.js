export function sidebar() {
    return `
        <div class="bg-dark text-white p-3" style="width:250px; min-height:100vh;">

            <h4>Menú</h4>

            <hr>

            <button id="btnDashboard" class="btn btn-outline-light w-100 mb-2">
                Dashboard
            </button>

            <button id="btnEquipos" class="btn btn-outline-light w-100 mb-2">
                Equipos
            </button>

            <button id="btnAreas" class="btn btn-outline-light w-100 mb-2">
                Áreas
            </button>

            <button id="btnMantenimiento" class="btn btn-outline-light w-100 mb-2">
                Mantenimiento
            </button>

            <button id="btnReportes" class="btn btn-outline-light w-100 mb-2">
                Reportes
            </button>

            <button id="btnHistorial" class="btn btn-outline-light w-100 mb-2">
                Historial
            </button>

        </div>
    `;
}