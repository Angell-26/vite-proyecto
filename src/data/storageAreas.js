const CLAVE = "areas";

export function obtenerAreas() {

    const datos = localStorage.getItem(CLAVE);

    if (datos) {
        return JSON.parse(datos);
    }

    return [
        {
            nombre: "Producción"
        }
    ];
}

export function guardarAreas(areas) {

    localStorage.setItem(CLAVE, JSON.stringify(areas));

}