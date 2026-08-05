import { layout } from "../components/layout.js";
import { obtenerEquipos } from "../data/storage.js";
import { obtenerAreas } from "../data/storageAreas.js";

export function dashboardPage() {

    const equipos = obtenerEquipos();
    const areas = obtenerAreas();

    const activos = equipos.filter(e => e.estado === "Activo").length;
    const inactivos = equipos.filter(e => e.estado === "Inactivo").length;

    const content = `
        <h2 class="mb-4">
            Dashboard
        </h2>

        <div class="row g-4">

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Equipos</h5>

                        <h1 class="text-primary">
                            ${equipos.length}
                        </h1>

                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Áreas</h5>

                        <h1 class="text-success">
                            ${areas.length}
                        </h1>

                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Activos</h5>

                        <h1 class="text-success">
                            ${activos}
                        </h1>

                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Inactivos</h5>

                        <h1 class="text-danger">
                            ${inactivos}
                        </h1>

                    </div>
                </div>
            </div>

        </div>

        <div class="card shadow mt-5">

            <div class="card-body">

                <h4 class="mb-3">
                    Resumen del sistema
                </h4>

                <ul class="list-group">

                    <li class="list-group-item">
                        Total de equipos registrados:
                        <strong>${equipos.length}</strong>
                    </li>

                    <li class="list-group-item">
                        Total de áreas registradas:
                        <strong>${areas.length}</strong>
                    </li>

                    <li class="list-group-item">
                        Equipos activos:
                        <strong>${activos}</strong>
                    </li>

                    <li class="list-group-item">
                        Equipos inactivos:
                        <strong>${inactivos}</strong>
                    </li>

                </ul>

            </div>

        </div>
    `;

    return layout(content);

}