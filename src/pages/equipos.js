import { layout } from "../components/layout.js";
import { obtenerEquipos, guardarEquipos } from "../data/storage.js";

let indiceEditar = -1;

function generarFilas() {

    const equipos = obtenerEquipos();

    let filas = "";

    equipos.forEach((equipo, index) => {

        filas += `
            <tr>
                <td>${equipo.codigo}</td>
                <td>${equipo.nombre}</td>
                <td>${equipo.area}</td>
                <td>${equipo.estado}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm editar"
                        data-index="${index}">
                        Editar
                    </button>

                    <button
                        class="btn btn-danger btn-sm eliminar"
                        data-index="${index}">
                        Eliminar
                    </button>

                </td>
            </tr>
        `;

    });

    return filas;
}

export function equiposPage() {

    const contenido = `
        <h2 class="mb-4">Gestión de Equipos</h2>

        <div class="mb-4">

            <input
                id="buscarEquipo"
                class="form-control"
                placeholder="Buscar por código, nombre o área...">

        </div>

        <form id="formEquipo" class="mb-4">

            <div class="row">

                <div class="col-md-3">
                    <input
                        id="codigo"
                        class="form-control"
                        placeholder="Código"
                        required>
                </div>

                <div class="col-md-3">
                    <input
                        id="nombre"
                        class="form-control"
                        placeholder="Nombre del equipo"
                        required>
                </div>

                <div class="col-md-3">
                    <input
                        id="area"
                        class="form-control"
                        placeholder="Área"
                        required>
                </div>

                <div class="col-md-2">
                    <select
                        id="estado"
                        class="form-select">

                        <option>Activo</option>
                        <option>Inactivo</option>

                    </select>
                </div>

                <div class="col-md-1">
                    <button
                        id="btnGuardar"
                        type="submit"
                        class="btn btn-primary w-100">
                        +
                    </button>
                </div>

            </div>

        </form>

        <table class="table table-bordered">

            <thead class="table-dark">
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Área</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody id="tablaEquipos">
                ${generarFilas()}
            </tbody>

        </table>
    `;

    const pagina = layout(contenido);

    setTimeout(() => {

        const formulario = document.getElementById("formEquipo");
        const tabla = document.getElementById("tablaEquipos");
        const btnGuardar = document.getElementById("btnGuardar");
        const buscar = document.getElementById("buscarEquipo");

        activarBotonesEliminar();
        activarBotonesEditar();

        formulario.addEventListener("submit", (e) => {

            e.preventDefault();

            const codigo = document.getElementById("codigo").value;
            const nombre = document.getElementById("nombre").value;
            const area = document.getElementById("area").value;
            const estado = document.getElementById("estado").value;

            const equipos = obtenerEquipos();

            if (indiceEditar === -1) {

                equipos.push({
                    codigo,
                    nombre,
                    area,
                    estado
                });

            } else {

                equipos[indiceEditar] = {
                    codigo,
                    nombre,
                    area,
                    estado
                };

                indiceEditar = -1;

                btnGuardar.textContent = "+";

            }

            guardarEquipos(equipos);

            tabla.innerHTML = generarFilas();

            formulario.reset();

            activarBotonesEliminar();
            activarBotonesEditar();

        });

        function activarBotonesEliminar() {

            document.querySelectorAll(".eliminar").forEach((boton) => {

                boton.onclick = function () {

                    const indice = this.dataset.index;

                    const equipos = obtenerEquipos();

                    equipos.splice(indice, 1);

                    guardarEquipos(equipos);

                    tabla.innerHTML = generarFilas();

                    activarBotonesEliminar();
                    activarBotonesEditar();

                };

            });

        }

        function activarBotonesEditar() {

            document.querySelectorAll(".editar").forEach((boton) => {

                boton.onclick = function () {

                    const indice = this.dataset.index;

                    const equipos = obtenerEquipos();

                    document.getElementById("codigo").value = equipos[indice].codigo;
                    document.getElementById("nombre").value = equipos[indice].nombre;
                    document.getElementById("area").value = equipos[indice].area;
                    document.getElementById("estado").value = equipos[indice].estado;

                    indiceEditar = indice;

                    btnGuardar.textContent = "Guardar";

                };

            });

        }

        buscar.addEventListener("keyup", () => {

            const texto = buscar.value.toLowerCase();

            const filas = tabla.querySelectorAll("tr");

            filas.forEach((fila) => {

                const contenido = fila.textContent.toLowerCase();

                if (contenido.includes(texto)) {

                    fila.style.display = "";

                } else {

                    fila.style.display = "none";

                }

            });

        });

    }, 0);

    return pagina;
}