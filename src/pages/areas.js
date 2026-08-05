import { layout } from "../components/layout.js";
import { obtenerAreas, guardarAreas } from "../data/storageAreas.js";

let indiceEditar = -1;

function generarFilas() {

    const areas = obtenerAreas();

    let filas = "";

    areas.forEach((area, index) => {

        filas += `
            <tr>

                <td>${area.nombre}</td>

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

export function areasPage() {

    const contenido = `

        <h2 class="mb-4">
            Gestión de Áreas
        </h2>

        <form id="formArea" class="mb-4">

            <div class="row">

                <div class="col-md-10">

                    <input
                        id="nombreArea"
                        class="form-control"
                        placeholder="Nombre del área"
                        required>

                </div>

                <div class="col-md-2">

                    <button
                        id="btnGuardar"
                        class="btn btn-primary w-100">

                        Guardar

                    </button>

                </div>

            </div>

        </form>

        <table class="table table-bordered">

            <thead class="table-dark">

                <tr>

                    <th>Nombre</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody id="tablaAreas">

                ${generarFilas()}

            </tbody>

        </table>

    `;

    const pagina = layout(contenido);

    setTimeout(() => {

        const formulario = document.getElementById("formArea");
        const tabla = document.getElementById("tablaAreas");
        const btnGuardar = document.getElementById("btnGuardar");

        activarEliminar();
        activarEditar();

        formulario.addEventListener("submit", (e) => {

            e.preventDefault();

            const nombre = document.getElementById("nombreArea").value;

            const areas = obtenerAreas();

            if (indiceEditar == -1) {

                areas.push({ nombre });

            } else {

                areas[indiceEditar].nombre = nombre;

                indiceEditar = -1;

                btnGuardar.textContent = "Guardar";

            }

            guardarAreas(areas);

            tabla.innerHTML = generarFilas();

            formulario.reset();

            activarEliminar();
            activarEditar();

        });

        function activarEliminar() {

            document.querySelectorAll(".eliminar").forEach((boton) => {

                boton.onclick = function () {

                    const indice = this.dataset.index;

                    const areas = obtenerAreas();

                    areas.splice(indice, 1);

                    guardarAreas(areas);

                    tabla.innerHTML = generarFilas();

                    activarEliminar();
                    activarEditar();

                };

            });

        }

        function activarEditar() {

            document.querySelectorAll(".editar").forEach((boton) => {

                boton.onclick = function () {

                    const indice = this.dataset.index;

                    const areas = obtenerAreas();

                    document.getElementById("nombreArea").value =
                        areas[indice].nombre;

                    indiceEditar = indice;

                    btnGuardar.textContent = "Actualizar";

                };

            });

        }

    }, 0);

    return pagina;

}