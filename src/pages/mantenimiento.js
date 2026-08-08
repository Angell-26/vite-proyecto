import { layout } from "../components/layout.js";

const STORAGE_KEY = "mantenimientos";

function obtenerMantenimientos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarMantenimientos(mantenimientos) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(mantenimientos)
    );
}

export function mantenimientoPage() {

    const content = `

        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2>Gestión de Mantenimiento</h2>
                <p class="text-muted">
                    Programación y control de mantenimientos
                </p>
            </div>

            <span class="badge bg-primary fs-6">
                Total: <span id="totalMantenimientos">0</span>
            </span>
        </div>

        <div class="card shadow mb-4">

            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Registrar Mantenimiento</h5>
            </div>

            <div class="card-body">

                <form id="formMantenimiento">

                    <input type="hidden" id="mantenimientoId">

                    <div class="row g-3">

                        <div class="col-md-6">

                            <label class="form-label">
                                Equipo
                            </label>

                            <input
                                type="text"
                                id="equipo"
                                class="form-control"
                                placeholder="Nombre del equipo"
                                required
                            >

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Tipo de mantenimiento
                            </label>

                            <select
                                id="tipo"
                                class="form-select"
                                required
                            >

                                <option value="">
                                    Seleccione
                                </option>

                                <option value="Preventivo">
                                    Preventivo
                                </option>

                                <option value="Correctivo">
                                    Correctivo
                                </option>

                                <option value="Predictivo">
                                    Predictivo
                                </option>

                            </select>

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Fecha
                            </label>

                            <input
                                type="date"
                                id="fecha"
                                class="form-control"
                                required
                            >

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Técnico
                            </label>

                            <input
                                type="text"
                                id="tecnico"
                                class="form-control"
                                placeholder="Nombre del técnico"
                                required
                            >

                        </div>

                        <div class="col-12">

                            <label class="form-label">
                                Observaciones
                            </label>

                            <textarea
                                id="observaciones"
                                class="form-control"
                                rows="3"
                                placeholder="Observaciones del mantenimiento"
                            ></textarea>

                        </div>

                        <div class="col-12">

                            <button
                                type="submit"
                                class="btn btn-primary"
                                id="btnGuardar"
                            >
                                Guardar mantenimiento
                            </button>

                            <button
                                type="button"
                                class="btn btn-secondary d-none"
                                id="btnCancelar"
                            >
                                Cancelar edición
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>


        <div class="card shadow">

            <div class="card-header">

                <div class="row align-items-center">

                    <div class="col-md-6">

                        <h5 class="mb-0">
                            Mantenimientos registrados
                        </h5>

                    </div>

                    <div class="col-md-6">

                        <input
                            type="text"
                            id="buscarMantenimiento"
                            class="form-control"
                            placeholder="Buscar por equipo..."
                        >

                    </div>

                </div>

            </div>

            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-hover align-middle">

                        <thead class="table-dark">

                            <tr>

                                <th>Equipo</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Técnico</th>
                                <th>Estado</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody id="tablaMantenimientos">

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    `;

    const pagina = layout(content);

    setTimeout(() => {

        iniciarMantenimiento();

    }, 0);

    return pagina;
}


function iniciarMantenimiento() {

    const formulario =
        document.getElementById("formMantenimiento");

    const buscador =
        document.getElementById("buscarMantenimiento");

    const cancelar =
        document.getElementById("btnCancelar");

    formulario.addEventListener(
        "submit",
        guardarMantenimiento
    );

    buscador.addEventListener(
        "input",
        mostrarMantenimientos
    );

    cancelar.addEventListener(
        "click",
        cancelarEdicion
    );

    mostrarMantenimientos();
}


function guardarMantenimiento(event) {

    event.preventDefault();

    const id =
        document.getElementById("mantenimientoId").value;

    const equipo =
        document.getElementById("equipo").value.trim();

    const tipo =
        document.getElementById("tipo").value;

    const fecha =
        document.getElementById("fecha").value;

    const tecnico =
        document.getElementById("tecnico").value.trim();

    const observaciones =
        document.getElementById("observaciones").value.trim();

    let mantenimientos =
        obtenerMantenimientos();


    if (id) {

        const indice =
            mantenimientos.findIndex(
                mantenimiento =>
                    mantenimiento.id == id
            );

        if (indice !== -1) {

            mantenimientos[indice] = {

                ...mantenimientos[indice],

                equipo,
                tipo,
                fecha,
                tecnico,
                observaciones

            };

        }

    } else {

        mantenimientos.push({

            id: Date.now(),

            equipo,

            tipo,

            fecha,

            tecnico,

            observaciones,

            estado: "Pendiente"

        });

    }


    guardarMantenimientos(mantenimientos);

    limpiarFormulario();

    mostrarMantenimientos();

}


function mostrarMantenimientos() {

    const tabla =
        document.getElementById("tablaMantenimientos");

    if (!tabla) return;


    const textoBusqueda =
        document
            .getElementById("buscarMantenimiento")
            .value
            .toLowerCase();


    const mantenimientos =
        obtenerMantenimientos();


    const filtrados =
        mantenimientos.filter(
            mantenimiento =>
                mantenimiento.equipo
                    .toLowerCase()
                    .includes(textoBusqueda)
        );


    tabla.innerHTML = "";


    if (filtrados.length === 0) {

        tabla.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center text-muted"
                >

                    No hay mantenimientos registrados.

                </td>

            </tr>

        `;

    } else {

        filtrados.forEach(mantenimiento => {

            tabla.innerHTML += `

                <tr>

                    <td>
                        ${mantenimiento.equipo}
                    </td>

                    <td>
                        ${mantenimiento.tipo}
                    </td>

                    <td>
                        ${mantenimiento.fecha}
                    </td>

                    <td>
                        ${mantenimiento.tecnico}
                    </td>

                    <td>

                        <select
                            class="form-select form-select-sm"
                            onchange="cambiarEstado(${mantenimiento.id}, this.value)"
                        >

                            <option
                                ${mantenimiento.estado === "Pendiente" ? "selected" : ""}
                            >
                                Pendiente
                            </option>

                            <option
                                ${mantenimiento.estado === "En proceso" ? "selected" : ""}
                            >
                                En proceso
                            </option>

                            <option
                                ${mantenimiento.estado === "Finalizado" ? "selected" : ""}
                            >
                                Finalizado
                            </option>

                        </select>

                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm me-1"
                            onclick="editarMantenimiento(${mantenimiento.id})"
                        >
                            Editar
                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarMantenimiento(${mantenimiento.id})"
                        >
                            Eliminar
                        </button>

                    </td>

                </tr>

            `;

        });

    }


    const total =
        document.getElementById(
            "totalMantenimientos"
        );

    if (total) {

        total.textContent =
            mantenimientos.length;

    }

}


window.editarMantenimiento =
    function(id) {

        const mantenimientos =
            obtenerMantenimientos();

        const mantenimiento =
            mantenimientos.find(
                item => item.id == id
            );

        if (!mantenimiento) return;


        document.getElementById(
            "mantenimientoId"
        ).value = mantenimiento.id;

        document.getElementById(
            "equipo"
        ).value = mantenimiento.equipo;

        document.getElementById(
            "tipo"
        ).value = mantenimiento.tipo;

        document.getElementById(
            "fecha"
        ).value = mantenimiento.fecha;

        document.getElementById(
            "tecnico"
        ).value = mantenimiento.tecnico;

        document.getElementById(
            "observaciones"
        ).value = mantenimiento.observaciones;


        document.getElementById(
            "btnGuardar"
        ).textContent = "Actualizar mantenimiento";

        document.getElementById(
            "btnCancelar"
        ).classList.remove("d-none");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


window.eliminarMantenimiento =
    function(id) {

        const confirmar =
            confirm(
                "¿Desea eliminar este mantenimiento?"
            );

        if (!confirmar) return;


        let mantenimientos =
            obtenerMantenimientos();

        mantenimientos =
            mantenimientos.filter(
                mantenimiento =>
                    mantenimiento.id != id
            );

        guardarMantenimientos(
            mantenimientos
        );

        mostrarMantenimientos();

    };


window.cambiarEstado =
    function(id, nuevoEstado) {

        const mantenimientos =
            obtenerMantenimientos();

        const mantenimiento =
            mantenimientos.find(
                item => item.id == id
            );

        if (!mantenimiento) return;

        mantenimiento.estado =
            nuevoEstado;

        guardarMantenimientos(
            mantenimientos
        );

    };


function cancelarEdicion() {

    limpiarFormulario();

}


function limpiarFormulario() {

    document
        .getElementById("formMantenimiento")
        .reset();

    document.getElementById(
        "mantenimientoId"
    ).value = "";

    document.getElementById(
        "btnGuardar"
    ).textContent =
        "Guardar mantenimiento";

    document.getElementById(
        "btnCancelar"
    ).classList.add("d-none");

}