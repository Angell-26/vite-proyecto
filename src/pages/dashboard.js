import { layout } from "../components/layout.js";
import { obtenerEquipos } from "../data/storage.js";
import { obtenerAreas } from "../data/storageAreas.js";
import {
  obtenerMantenimientos,
  contarPorEstado,
  contarPorTipo,
} from "../services/reportService.js";

export function dashboardPage() {

  const equipos = obtenerEquipos();
  const areas = obtenerAreas();
  const mantenimientos = obtenerMantenimientos();

  const cuentaEstados = contarPorEstado(mantenimientos);
  const cuentaTipos = contarPorTipo(mantenimientos);

  const activos = equipos.filter((e) => e.estado === "Activo").length;
  const inactivos = equipos.filter((e) => e.estado === "Inactivo").length;

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

        <div class="row g-4 mt-4">

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Mantenimientos</h5>

                        <h1 class="text-primary" id="totalMantenimientosDashboard">
                            ${mantenimientos.length}
                        </h1>

                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Pendientes</h5>

                        <h1 class="text-warning" id="pendientesCount">
                            ${cuentaEstados["Pendiente"] || 0}
                        </h1>

                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> En proceso</h5>

                        <h1 class="text-info" id="enProcesoCount">
                            ${cuentaEstados["En proceso"] || 0}
                        </h1>

                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card shadow text-center">
                    <div class="card-body">

                        <h5> Finalizados</h5>

                        <h1 class="text-success" id="finalizadosCount">
                            ${cuentaEstados["Finalizado"] || 0}
                        </h1>

                    </div>
                </div>
            </div>

        </div>

        <div class="row g-4 mt-3">

            <div class="col-md-4">
                <div class="card shadow text-center">
                    <div class="card-body">
                        <h5> Preventivos</h5>
                        <h1 id="preventivosCount">${cuentaTipos["Preventivo"] || 0}</h1>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card shadow text-center">
                    <div class="card-body">
                        <h5> Correctivos</h5>
                        <h1 id="correctivosCount">${cuentaTipos["Correctivo"] || 0}</h1>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card shadow text-center">
                    <div class="card-body">
                        <h5> Predictivos</h5>
                        <h1 id="predictivosCount">${cuentaTipos["Predictivo"] || 0}</h1>
                    </div>
                </div>
            </div>

        </div>

        <div class="row g-4 mt-4">

            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-body">
                        <h5>Mantenimientos por estado</h5>
                        <canvas id="chartEstado" height="200"></canvas>
                        <div id="chartEstadoMsg" class="mt-2 text-muted small"></div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-body">
                        <h5>Mantenimientos por tipo</h5>
                        <canvas id="chartTipo" height="200"></canvas>
                        <div id="chartTipoMsg" class="mt-2 text-muted small"></div>
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

  const pagina = layout(content);

  // Dibujar gráficos después de renderizar la página
  setTimeout(() => {
    try {
      const ctxEstado = document.getElementById("chartEstado");
      const ctxTipo = document.getElementById("chartTipo");

      // los datos se leen directamente del localStorage para mantener consistencia
      const mantenimientos = obtenerMantenimientos();

      const cuentaEstados = contarPorEstado(mantenimientos);
      const cuentaTipos = contarPorTipo(mantenimientos);

      const estadosOrden = ["Pendiente", "En proceso", "Finalizado"];
      const tiposOrden = ["Preventivo", "Correctivo", "Predictivo"];

      const datosEstados = estadosOrden.map((k) => cuentaEstados[k] || 0);
      const datosTipos = tiposOrden.map((k) => cuentaTipos[k] || 0);

      if (window.Chart && ctxEstado) {
        new Chart(ctxEstado.getContext("2d"), {
          type: "doughnut",
          data: {
            labels: estadosOrden,
            datasets: [
              {
                data: datosEstados,
                backgroundColor: ["#FFC107", "#0DCAF0", "#198754"],
              },
            ],
          },
        });
        if (document.getElementById("chartEstadoMsg")) {
          document.getElementById("chartEstadoMsg").textContent = "";
        }
      } else if (document.getElementById("chartEstadoMsg")) {
        document.getElementById("chartEstadoMsg").textContent =
          "Gráfico no disponible. Asegúrate de cargar Chart.js (CDN).";
      }

      if (window.Chart && ctxTipo) {
        new Chart(ctxTipo.getContext("2d"), {
          type: "bar",
          data: {
            labels: tiposOrden,
            datasets: [
              {
                label: "Cantidad",
                data: datosTipos,
                backgroundColor: ["#0D6EFD", "#DC3545", "#6610F2"],
              },
            ],
          },
          options: {
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
        if (document.getElementById("chartTipoMsg")) {
          document.getElementById("chartTipoMsg").textContent = "";
        }
      } else if (document.getElementById("chartTipoMsg")) {
        document.getElementById("chartTipoMsg").textContent =
          "Gráfico no disponible. Asegúrate de cargar Chart.js (CDN).";
      }

    } catch (e) {
      // no interrumpir la aplicación por errores de gráficos
      console.error("Error al generar gráficos del dashboard", e);
    }

  }, 0);

  return pagina;

}
