import { layout } from "../components/layout.js";
import { obtenerEquipos } from "../data/storage.js";
import { obtenerMantenimientos, obtenerHistorialEquipo } from "../services/reportService.js";

export function historialPage() {

  const equipos = obtenerEquipos();

  const content = `
    <h2 class="mb-4">Historial por equipo</h2>

    <div class="card shadow mb-4">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-md-6">
            <label class="form-label">Equipo</label>
            <select id="selectEquipo" class="form-select">
              <option value="">-- Seleccione --</option>
              ${equipos.map(e => `<option value="${e.nombre}">${e.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <button id="btnBuscarHist" class="btn btn-primary">Ver historial</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Técnico</th>
                <th>Estado</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody id="tablaHistorial"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const page = layout(content);

  setTimeout(() => {
    const select = document.getElementById('selectEquipo');
    const btn = document.getElementById('btnBuscarHist');
    const tabla = document.getElementById('tablaHistorial');

    function mostrar() {
      const nombre = select.value;
      const all = obtenerMantenimientos();
      const lista = obtenerHistorialEquipo(all, nombre);

      tabla.innerHTML = '';
      if (!nombre) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Seleccione un equipo.</td></tr>`;
        return;
      }

      if (lista.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay mantenimientos para este equipo.</td></tr>`;
        return;
      }

      lista.forEach(m => {
        tabla.innerHTML += `
          <tr>
            <td>${m.fecha || ''}</td>
            <td>${m.tipo || ''}</td>
            <td>${m.tecnico || ''}</td>
            <td>${m.estado || ''}</td>
            <td>${m.observaciones || ''}</td>
          </tr>
        `;
      });
    }

    btn.addEventListener('click', mostrar);

  }, 0);

  return page;
}
