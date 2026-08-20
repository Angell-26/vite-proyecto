import { layout } from "../components/layout.js";
import {
  obtenerMantenimientos,
  filtrarPorFecha,
  filtrarPorEstado,
  filtrarPorTipo,
} from "../services/reportService.js";

export function reportesPage() {

  const content = `
    <h2 class="mb-4">Reportes</h2>

    <div class="card shadow mb-4">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-md-3">
            <label class="form-label">Fecha inicio</label>
            <input type="date" id="fechaInicio" class="form-control">
          </div>

          <div class="col-md-3">
            <label class="form-label">Fecha fin</label>
            <input type="date" id="fechaFin" class="form-control">
          </div>

          <div class="col-md-2">
            <label class="form-label">Estado</label>
            <select id="fEstado" class="form-select">
              <option value="Todos">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          <div class="col-md-2">
            <label class="form-label">Tipo</label>
            <select id="fTipo" class="form-select">
              <option value="Todos">Todos</option>
              <option value="Preventivo">Preventivo</option>
              <option value="Correctivo">Correctivo</option>
              <option value="Predictivo">Predictivo</option>
            </select>
          </div>

          <div class="col-md-2">
            <button id="btnFiltrar" class="btn btn-primary w-100">Buscar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <strong>Resultados:</strong> <span id="totalReportes">0</span>
      </div>
      <div>
        <button id="btnExportCsv" class="btn btn-outline-secondary me-2">Exportar CSV</button>
        <button id="btnPrint" class="btn btn-outline-secondary">Imprimir / Guardar PDF</button>
      </div>
    </div>

    <div class="card shadow">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Equipo</th>
                <th>Tipo</th>
                <th>Técnico</th>
                <th>Estado</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody id="tablaReportes"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const page = layout(content);

  setTimeout(() => {

    const fechaInicio = document.getElementById("fechaInicio");
    const fechaFin = document.getElementById("fechaFin");
    const fEstado = document.getElementById("fEstado");
    const fTipo = document.getElementById("fTipo");
    const btnFiltrar = document.getElementById("btnFiltrar");
    const tabla = document.getElementById("tablaReportes");
    const total = document.getElementById("totalReportes");
    const btnExport = document.getElementById("btnExportCsv");
    const btnPrint = document.getElementById("btnPrint");

    function cargar() {
      let datos = obtenerMantenimientos();

      datos = filtrarPorFecha(datos, fechaInicio.value, fechaFin.value);
      datos = filtrarPorEstado(datos, fEstado.value);
      datos = filtrarPorTipo(datos, fTipo.value);

      tabla.innerHTML = "";

      if (datos.length === 0) {
        tabla.innerHTML = `
          <tr>
            <td colspan="6" class="text-center text-muted">No se encontraron registros.</td>
          </tr>
        `;
      } else {
        datos.forEach((m) => {
          tabla.innerHTML += `
            <tr>
              <td>${m.fecha || ''}</td>
              <td>${m.equipo || ''}</td>
              <td>${m.tipo || ''}</td>
              <td>${m.tecnico || ''}</td>
              <td>${m.estado || ''}</td>
              <td>${m.observaciones || ''}</td>
            </tr>
          `;
        });
      }

      total.textContent = datos.length;
      return datos;
    }

    btnFiltrar.addEventListener("click", () => cargar());

    btnExport.addEventListener("click", () => {
      const datos = cargar();
      exportCsv(datos);
    });

    btnPrint.addEventListener("click", () => {
      window.print();
    });

    // cargar inicialmente
    cargar();

    function exportCsv(items) {
      if (!items || items.length === 0) return;

      const headers = ["Fecha", "Equipo", "Tipo", "Tecnico", "Estado", "Observaciones"];
      const rows = items.map((m) => [m.fecha, m.equipo, m.tipo, m.tecnico, m.estado, (m.observaciones || '').replace(/\n/g, ' ')]);

      const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${(c||'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reportes_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

  }, 0);

  return page;
}
