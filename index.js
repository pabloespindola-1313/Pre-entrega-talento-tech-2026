const args = process.argv.slice(2);
console.log(args);

async function mostrarProductos() {
  try {
    const resultado = await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.log("Error:", error);
  }
}

async function mostrarProductosPorID(id) {
  try {
    const producto = await fetch(
      "https://fakestoreapi.com/products/" + id,
    ).then((response) => response.json());
    console.log(producto);
  } catch (error) {
    console.log("Error:", error);
  }
}

async function agregarProducto(producto) {
  try {

    const resultado = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => console.log("Producto agregado!"));
  } catch (error) {
    console.log("Error:", error);
  }
}

async function eliminarProducto(id) {
  try {
    const resultado = await fetch("https://fakestoreapi.com/products/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(`Producto eliminado: ${data}`));
  } catch (error) {
    console.log("Error:", error);
  }
}

if (args[0] === "GET") {
  // Posibilidad de buscar por ID o todos los productos
  if (args[1] === "products") {
    // Proceso para mostrar todos los productos

    console.log("Mostrando todos los productos:");
    mostrarProductos();
  } else {
    // Proceso para buscar producto por ID

    console.log("Mostrando productos por ID:");
    const id = args[1].slice(9);

    mostrarProductosPorID(id);
  }
} else if (args[0] === "POST") {
  // Proceso de agregar un producto (caracteristicas)
  console.log("Agregando productos");

  const producto = { title: args[1], price: [2] };
  agregarProducto(producto);
} else if (args[0] === "DELETE") {
  // Proceso de eliminar un producto (products/ID)

  console.log("Eliminando producto");
  const id = args[1].slice(9);
  eliminarProducto(id);
} else {
  console.log(`Ingreso no válido. Utilice los siguientes comandos:
         npm run start GET products
         npm run start GET products/<productId>
         npm run start POST products <title> <price> <category>
         npm run start DELETE products/<productId>`);
}
