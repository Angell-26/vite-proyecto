const STORAGE_KEY = "mantenimientos";

export function obtenerMantenimientos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function filtrarPorFecha(mantenimientos, fechaInicio, fechaFin) {
  if (!fechaInicio && !fechaFin) return mantenimientos;

  const inicio = fechaInicio ? new Date(fechaInicio) : null;
  const fin = fechaFin ? new Date(fechaFin) : null;

  return mantenimientos.filter((m) => {
    if (!m.fecha) return false;
    const f = new Date(m.fecha);

    if (inicio && f < inicio) return false;
    if (fin && f > fin) return false;
    return true;
  });
}

export function filtrarPorEstado(mantenimientos, estado) {
  if (!estado || estado === "Todos") return mantenimientos;
  return mantenimientos.filter((m) => m.estado === estado);
}

export function filtrarPorTipo(mantenimientos, tipo) {
  if (!tipo || tipo === "Todos") return mantenimientos;
  return mantenimientos.filter((m) => m.tipo === tipo);
}

export function contarPorEstado(mantenimientos) {
  const cuenta = {};
  mantenimientos.forEach((m) => {
    const k = m.estado || "Desconocido";
    cuenta[k] = (cuenta[k] || 0) + 1;
  });
  return cuenta;
}

export function contarPorTipo(mantenimientos) {
  const cuenta = {};
  mantenimientos.forEach((m) => {
    const k = m.tipo || "Desconocido";
    cuenta[k] = (cuenta[k] || 0) + 1;
  });
  return cuenta;
}

export function contarMantenimientosPorEquipo(mantenimientos) {
  const cuenta = {};
  mantenimientos.forEach((m) => {
    const k = m.equipo || "Sin equipo";
    cuenta[k] = (cuenta[k] || 0) + 1;
  });
  return cuenta;
}

export function obtenerHistorialEquipo(mantenimientos, nombreEquipo) {
  if (!nombreEquipo) return [];
  const lista = mantenimientos.filter((m) => m.equipo === nombreEquipo);
  // ordenar por fecha descendente (más reciente primero)
  lista.sort((a, b) => {
    const fa = a.fecha ? new Date(a.fecha) : new Date(0);
    const fb = b.fecha ? new Date(b.fecha) : new Date(0);
    return fb - fa;
  });
  return lista;
}
