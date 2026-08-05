const CLAVE = "equipos";

export function obtenerEquipos() {

    const datos = localStorage.getItem(CLAVE);

    if (datos) {
        return JSON.parse(datos);
    }

    return [
        {
            codigo: "EQ001",
            nombre: "Compresor",
            area: "Producción",
            estado: "Activo"
        }
    ];

}

export function guardarEquipos(equipos) {

    localStorage.setItem(CLAVE, JSON.stringify(equipos));

}