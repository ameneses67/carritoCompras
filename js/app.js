// VARIABLES

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// LISTENERS

// En una sola función se agregan todos los listeners
generarEventListeners();
function generarEventListeners() {
  // Clic a botón "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Eliminar artículos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // resetear el arreglo
    limpiarHTML(); // eliminar el html del <tbody>
  });
}

// FUNCIONES

// Se crea un función para cada listener
function agregarCurso(e) {
  e.preventDefault(); //Evita la acción por default, que en el caso de los enlaces es ir al href
  if (e.target.classList.contains("agregar-carrito")) {
    // Se indica que el target del evento tenga la clase "agregar-carrito" para que solamente se dispare con el clic en el botón y no en toda la sección "lista-cursos"
    const cursoSeleccionado = e.target.parentElement.parentElement;
    // console.log(e.target.parentElement.parentElement);
    leerDatosCurso(cursoSeleccionado);
  }
}

// No se recomiendan funciones muy grandes por lo que vamos a crear otra función para extraer los datos del curso correspondientes al botón "agregar al carrito"
function leerDatosCurso(curso) {
  // Crear objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisar si un artículo ya existe en el carrito para evitar que lo ponga doble y en lugar de eso modifique la cantidad que por default es 1
  const exite = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (exite) {
    // Si ya existe actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto duplicado con la cantidad modificada para crear el arreglo "cursos" generado por .map,
      } else {
        return curso; // retorna los objetos no duplicados
      }
    });
    articulosCarrito = [...cursos]; // copiar cursos a articulosCarrito
  } else {
    // Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Crear el html de los artículos añadidos al carrito
function carritoHTML() {
  // Limpiar el html
  limpiarHTML();

  // Recorrer el objeto y generar el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso; // Usar "destructure" para mejorar el código y no usar curso.imagen, curso.titulo, etc en las variables asignadas a cada <td>
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
      </td>
    `;

    // Agregar el html de los artículos al <tbody> del carrito
    contenedorCarrito.appendChild(row);
  });
}

// Eliminar los cursos duplicados del <tbody>
function limpiarHTML() {
  // Linea de abajo es la forma "lenta"
  // contenedorCarrito.innerHTML = "";

  // Y esta es la forma "rápida" recomendada
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

// Eliminar los artículos del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // Elminar del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); // Iterar sobre el carrito para regenerar el html
  }
}
